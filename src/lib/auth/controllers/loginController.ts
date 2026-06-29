import { AUTH_EVENTS } from "../config";
import { AuthApiError } from "../errors";
import type { AuthService } from "../services/AuthService";
import type { AuthUser, UserProfile } from "../types";
import { formatRut, normalizeRutForApi } from "@/lib/rut";
import {
  formatChilePhoneLocal,
  isValidChileMobileLocal,
} from "@/lib/phone/formatChilePhone";
import { getDisplayName } from "@/lib/user/getDisplayName";

interface LoginControllerDeps {
  authService: AuthService;
}

const SLIDE_COUNT = 5;
const SLIDES = {
  LOGIN: 0,
  REGISTER: 1,
  SUCCESS: 2,
  ACCOUNT: 3,
  PROFILE: 4,
} as const;

type HeaderMode = "default" | "profile" | "account";
type FormId = "loginForm" | "registerForm" | "profileForm";

let loginControllerInitialized = false;

export function initLoginController({ authService }: LoginControllerDeps): void {
  if (loginControllerInitialized) return;
  loginControllerInitialized = true;

  const loginModule = document.querySelector(".loginModule");
  let isOpening = false;

  function setLoginSlide(slideIndex: number) {
    const track = document.querySelector(".loginSliderTrack");
    if (track instanceof HTMLElement) {
      track.style.transform = `translateX(${-(slideIndex * 100) / SLIDE_COUNT}%)`;
    }

    const tabs = document.querySelector(".loginTabs");
    const hideTabs =
      slideIndex === SLIDES.SUCCESS ||
      slideIndex === SLIDES.ACCOUNT ||
      slideIndex === SLIDES.PROFILE;

    if (tabs instanceof HTMLElement) {
      if (hideTabs) {
        tabs.style.opacity = "0";
        tabs.style.pointerEvents = "none";
        setTimeout(() => {
          if (tabs.style.opacity === "0") {
            tabs.style.display = "none";
          }
        }, 300);
      } else {
        tabs.style.display = "flex";
        setTimeout(() => {
          tabs.style.opacity = "1";
          tabs.style.pointerEvents = "auto";
        }, 10);

        tabs.querySelectorAll(".loginTab").forEach((btn, idx) => {
          btn.classList.toggle("active", idx === slideIndex);
        });
      }
    }

    const loader = document.getElementById("loginSessionLoader");
    const expiredNotice = document.getElementById("loginSessionExpired");
    if (loader) loader.hidden = true;
    if (expiredNotice && slideIndex !== SLIDES.LOGIN) {
      expiredNotice.hidden = true;
    }
  }

  function setLoginHeader(mode: HeaderMode) {
    const titleEl = document.getElementById("loginHeaderTitle");
    const subtitleEl = document.getElementById("loginHeaderSubtitle");
    if (!titleEl || !subtitleEl) return;

    if (mode === "profile") {
      titleEl.innerHTML =
        '<strong>Modificar</strong> <span class="break">tu perfil Belén</span>';
      subtitleEl.textContent =
        "Actualiza tus datos personales para compras, recetas y beneficios.";
      return;
    }

    if (mode === "account") {
      titleEl.innerHTML =
        '<strong>Tu cuenta</strong> <span class="break">Belén Express</span>';
      subtitleEl.textContent = "Gestiona tu perfil, compras y sesión desde aquí.";
      return;
    }

    titleEl.innerHTML =
      '<strong>Ingresa o Activa</strong> <span class="break">tu cuenta Belén</span>';
    subtitleEl.textContent =
      "Complete sus datos aquí y comience a ahorrar en sus remedios.";
  }

  function setSessionLoader(visible: boolean) {
    const loader = document.getElementById("loginSessionLoader");
    const tabs = document.querySelector(".loginTabs");
    const slider = document.querySelector(".loginSliderContainer");

    if (loader) loader.hidden = !visible;
    if (tabs instanceof HTMLElement) tabs.hidden = visible;
    if (slider instanceof HTMLElement) slider.hidden = visible;
  }

  function setSessionExpiredNotice(visible: boolean) {
    const notice = document.getElementById("loginSessionExpired");
    if (notice) notice.hidden = !visible;
  }

  function setOrdersComingSoonNotice(visible: boolean) {
    const notice = document.getElementById("accountOrdersNotice");
    if (notice) notice.hidden = !visible;
  }

  function populateProfileForm(profile: UserProfile) {
    const fullNameInput = document.getElementById(
      "profileFullName"
    ) as HTMLInputElement | null;
    const emailInput = document.getElementById(
      "profileEmail"
    ) as HTMLInputElement | null;
    const rutInput = document.getElementById("profileRut") as HTMLInputElement | null;
    const passwordInput = document.getElementById(
      "profilePassword"
    ) as HTMLInputElement | null;

    if (fullNameInput) fullNameInput.value = profile.fullName ?? "";
    if (emailInput) emailInput.value = profile.email ?? "";
    if (rutInput) {
      rutInput.value = profile.rut ? formatRut(profile.rut) : "";
    }
    if (passwordInput) passwordInput.value = "";
  }

  function showAccountMenu(user: AuthUser) {
    const accountName = document.getElementById("accountDisplayName");
    const accountEmail = document.getElementById("accountEmail");

    if (accountName) {
      accountName.textContent = getDisplayName(user.fullName);
    }
    if (accountEmail) {
      accountEmail.textContent = user.email;
    }

    document.querySelectorAll(".greetingName").forEach((greet) => {
      greet.textContent = getDisplayName(user.fullName);
    });

    setLoginHeader("account");
    setOrdersComingSoonNotice(false);
    setLoginSlide(SLIDES.ACCOUNT);
  }

  async function openProfileSlide(fromAccount = false) {
    clearFormErrors();

    if (fromAccount) {
      const cachedProfile = authService.getCachedProfile();
      const session = authService.getSession();
      if (cachedProfile && session) {
        populateProfileForm(cachedProfile);
        setLoginHeader("profile");
        setLoginSlide(SLIDES.PROFILE);
        return;
      }
    }

    if (!fromAccount) {
      setSessionLoader(true);
    }

    try {
      const result = await authService.validateSession();

      if (!result.valid || !result.profile || !result.user) {
        setLoginHeader("default");
        setLoginSlide(SLIDES.LOGIN);
        setSessionExpiredNotice(true);
        return;
      }

      populateProfileForm(result.profile);
      setLoginHeader("profile");
      setLoginSlide(SLIDES.PROFILE);
    } catch {
      setLoginHeader("default");
      setLoginSlide(SLIDES.LOGIN);
      setSessionExpiredNotice(true);
    } finally {
      if (!fromAccount) {
        setSessionLoader(false);
      }
    }
  }

  async function openLogin() {
    if (!loginModule || isOpening) return;

    isOpening = true;
    loginModule.classList.add("active");
    document.body.style.overflow = "hidden";
    setSessionExpiredNotice(false);
    setSessionLoader(true);

    const hadStoredSession = Boolean(authService.getSession());

    try {
      const result = await authService.validateSession();

      if (result.valid && result.user) {
        showAccountMenu(result.user);
        return;
      }

      setLoginHeader("default");
      setLoginSlide(SLIDES.LOGIN);
      if (hadStoredSession) {
        setSessionExpiredNotice(true);
      }
    } catch {
      setLoginHeader("default");
      setLoginSlide(SLIDES.LOGIN);
      if (hadStoredSession) {
        setSessionExpiredNotice(true);
      }
    } finally {
      setSessionLoader(false);
      isOpening = false;
    }
  }

  function closeLogin() {
    if (loginModule) {
      loginModule.classList.remove("active");
      document.body.style.overflow = "";
      setTimeout(() => {
        setLoginHeader("default");
        setLoginSlide(SLIDES.LOGIN);
        setSessionExpiredNotice(false);
        setOrdersComingSoonNotice(false);
        clearFormErrors();
        (document.getElementById("loginForm") as HTMLFormElement | null)?.reset();
        (document.getElementById("registerForm") as HTMLFormElement | null)?.reset();
        (document.getElementById("profileForm") as HTMLFormElement | null)?.reset();
      }, 400);
    }
  }

  function showFormError(formId: FormId, message: string) {
    const errorEl = document.getElementById(`${formId}Error`);
    if (errorEl) {
      errorEl.textContent = message;
      errorEl.hidden = false;
    }
  }

  function clearFormErrors() {
    ["loginFormError", "registerFormError", "profileFormError"].forEach((id) => {
      const errorEl = document.getElementById(id);
      if (errorEl) {
        errorEl.textContent = "";
        errorEl.hidden = true;
      }
    });
  }

  function setSubmitLoading(formId: FormId, loading: boolean) {
    const form = document.getElementById(formId);
    const submitBtn = form?.querySelector(".loginSubmitBtn") as HTMLButtonElement | null;
    if (!submitBtn) return;

    submitBtn.disabled = loading;

    if (formId === "loginForm") {
      submitBtn.textContent = loading ? "Ingresando..." : "Ingresar";
      return;
    }

    if (formId === "registerForm") {
      submitBtn.textContent = loading
        ? "Registrando..."
        : "Registrarme y Activar Cuenta";
      return;
    }

    submitBtn.textContent = loading ? "Guardando..." : "Guardar cambios";
  }

  function showLoginSuccess(displayName: string, title: string) {
    const successMainTitle = document.getElementById("successMainTitle");
    const successDisplayName = document.getElementById("successDisplayName");
    if (successMainTitle) successMainTitle.textContent = title;
    if (successDisplayName) successDisplayName.textContent = displayName;

    document.querySelectorAll(".greetingName").forEach((greet) => {
      greet.textContent = displayName;
    });

    setLoginSlide(SLIDES.SUCCESS);
  }

  function resolveErrorMessage(error: unknown): string {
    if (error instanceof AuthApiError) {
      return error.message;
    }
    if (error instanceof Error && error.message) {
      return error.message;
    }
    return "No se pudo completar la operación. Intenta nuevamente.";
  }

  window.addEventListener(AUTH_EVENTS.openProfile, () => {
    if (!loginModule?.classList.contains("active")) {
      loginModule?.classList.add("active");
      document.body.style.overflow = "hidden";
    }
    void openProfileSlide();
  });

  document.addEventListener("submit", async (e) => {
    const target = e.target;
    if (!(target instanceof HTMLFormElement)) return;

    if (target.id === "loginForm") {
      e.preventDefault();
      clearFormErrors();
      setSessionExpiredNotice(false);

      const email =
        (document.getElementById("loginEmail") as HTMLInputElement | null)?.value ??
        "";
      const password =
        (document.getElementById("loginPassword") as HTMLInputElement | null)
          ?.value ?? "";

      setSubmitLoading("loginForm", true);

      try {
        const response = await authService.login({ email, password });
        showLoginSuccess(getDisplayName(response.user.fullName), "¡Acceso Exitoso!");
      } catch (error) {
        showFormError("loginForm", resolveErrorMessage(error));
      } finally {
        setSubmitLoading("loginForm", false);
      }
    }

    if (target.id === "registerForm") {
      e.preventDefault();
      clearFormErrors();

      const fullName =
        (document.getElementById("registerName") as HTMLInputElement | null)?.value ??
        "";
      const rut = normalizeRutForApi(
        (document.getElementById("registerRut") as HTMLInputElement | null)?.value ??
          ""
      );
      const email =
        (document.getElementById("registerEmail") as HTMLInputElement | null)?.value ??
        "";
      const password =
        (document.getElementById("registerPassword") as HTMLInputElement | null)
          ?.value ?? "";
      const phone =
        (document.getElementById("registerPhone") as HTMLInputElement | null)?.value ??
        "";

      if (password.length < 8) {
        showFormError(
          "registerForm",
          "La contraseña debe tener al menos 8 caracteres."
        );
        return;
      }

      if (!isValidChileMobileLocal(phone)) {
        showFormError(
          "registerForm",
          "Ingresa un celular válido de 9 dígitos (ej: 9 1234 5678)."
        );
        return;
      }

      setSubmitLoading("registerForm", true);

      try {
        const response = await authService.registerAndLogin({
          email,
          password,
          fullName,
          rut,
        });
        showLoginSuccess(
          getDisplayName(response.user.fullName),
          "¡Registro Exitoso!"
        );
      } catch (error) {
        showFormError("registerForm", resolveErrorMessage(error));
      } finally {
        setSubmitLoading("registerForm", false);
      }
    }

    if (target.id === "profileForm") {
      e.preventDefault();
      clearFormErrors();

      const fullName =
        (document.getElementById("profileFullName") as HTMLInputElement | null)?.value ??
        "";
      const rut = normalizeRutForApi(
        (document.getElementById("profileRut") as HTMLInputElement | null)?.value ??
          ""
      );
      const email =
        (document.getElementById("profileEmail") as HTMLInputElement | null)?.value ??
        "";
      const password =
        (document.getElementById("profilePassword") as HTMLInputElement | null)
          ?.value ?? "";

      if (password && password.length < 8) {
        showFormError(
          "profileForm",
          "La nueva contraseña debe tener al menos 8 caracteres."
        );
        return;
      }

      setSubmitLoading("profileForm", true);

      try {
        const updatedProfile = await authService.updateProfile({
          fullName: fullName.trim(),
          rut: rut || undefined,
          email: email.trim(),
          ...(password ? { password } : {}),
        });

        const session = authService.getSession();
        if (session) {
          showAccountMenu(session.user);
        } else {
          populateProfileForm(updatedProfile);
        }

        setLoginHeader("account");
        setLoginSlide(SLIDES.ACCOUNT);
      } catch (error) {
        showFormError("profileForm", resolveErrorMessage(error));
      } finally {
        setSubmitLoading("profileForm", false);
      }
    }
  });

  document.addEventListener("input", (e) => {
    const input = e.target;
    if (!(input instanceof HTMLInputElement)) return;

    if (input.id !== "registerRut" && input.id !== "profileRut" && input.id !== "registerPhone") {
      return;
    }

    if (input.id === "registerPhone") {
      const formatted = formatChilePhoneLocal(input.value);
      if (input.value !== formatted) {
        input.value = formatted;
      }
      return;
    }

    const formatted = formatRut(input.value);
    if (input.value !== formatted) {
      input.value = formatted;
    }
  });

  document.addEventListener("click", (e) => {
    const toggleBtn = (e.target as Element).closest(".loginPasswordToggle");
    if (toggleBtn) {
      const group = toggleBtn.closest(".loginInputGroup");
      const input = group?.querySelector(".loginInputField") as HTMLInputElement | null;
      const icon = toggleBtn.querySelector("i");
      if (input && icon) {
        if (input.type === "password") {
          input.type = "text";
          icon.classList.remove("bi-eye");
          icon.classList.add("bi-eye-slash");
        } else {
          input.type = "password";
          icon.classList.remove("bi-eye-slash");
          icon.classList.add("bi-eye");
        }
      }
    }
  });

  document.addEventListener("click", (e) => {
    const tab = (e.target as Element).closest(".loginTab");
    if (tab) {
      clearFormErrors();
      setSessionExpiredNotice(false);
      setLoginHeader("default");
      const targetTab = tab.getAttribute("data-tab");
      if (targetTab === "login") setLoginSlide(SLIDES.LOGIN);
      if (targetTab === "register") setLoginSlide(SLIDES.REGISTER);
    }
  });

  document.addEventListener("click", (e) => {
    if ((e.target as Element).closest(".accessclientBtn")) {
      e.preventDefault();
      void openLogin();
    }
  });

  document.addEventListener("click", (e) => {
    if (
      (e.target as Element).closest(
        ".loginCloseBtn, .successCloseBtn, #btn-account-continue"
      )
    ) {
      closeLogin();
      return;
    }

    if ((e.target as Element).closest("#btn-open-profile")) {
      e.preventDefault();
      setOrdersComingSoonNotice(false);
      void openProfileSlide(true);
      return;
    }

    if ((e.target as Element).closest("#btn-profile-back")) {
      e.preventDefault();
      const session = authService.getSession();
      if (session) {
        setLoginHeader("account");
        setLoginSlide(SLIDES.ACCOUNT);
      } else {
        setLoginHeader("default");
        setLoginSlide(SLIDES.LOGIN);
      }
      return;
    }

    if ((e.target as Element).closest("#btn-session-expired-login")) {
      e.preventDefault();
      setSessionExpiredNotice(false);
      setLoginHeader("default");
      setLoginSlide(SLIDES.LOGIN);
      return;
    }

    if ((e.target as Element).closest("#btn-account-logout")) {
      authService.logout();
      closeLogin();
      return;
    }

    if ((e.target as Element).closest("#btn-account-orders")) {
      e.preventDefault();
      setOrdersComingSoonNotice(true);
      return;
    }

    if (loginModule && e.target === loginModule) {
      closeLogin();
    }

    if ((e.target as Element).closest(".loginForgotLink")) {
      e.preventDefault();
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && loginModule?.classList.contains("active")) {
      closeLogin();
    }
  });
}
