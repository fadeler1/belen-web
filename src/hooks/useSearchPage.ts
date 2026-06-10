"use client";

import { useEffect } from "react";

export function useSearchPage() {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const query = params.get("q");
    const queryEl = document.querySelector(".searchQueryValue");

    if (queryEl && query) {
      queryEl.textContent = decodeURIComponent(query);
    }

    const searchInputs = document.querySelectorAll<HTMLInputElement>(".searchInput");
    if (query) {
      searchInputs.forEach((input) => {
        input.value = decodeURIComponent(query);
      });
    }

    const filterButtons = document.querySelectorAll<HTMLButtonElement>(".filterButton");
    const productsContainer = document.querySelector<HTMLElement>(".searchProducts");

    if (!productsContainer) return;

    const originalCards = Array.from(
      productsContainer.querySelectorAll(".cardproductMaster")
    );

    const handlers: Array<{ btn: HTMLButtonElement; handler: () => void }> = [];

    filterButtons.forEach((btn) => {
      const handler = () => {
        filterButtons.forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");

        const sortType = btn.dataset.sort;
        let sortedCards = [...originalCards];

        productsContainer.style.transition = "none";
        productsContainer.style.opacity = "0";
        productsContainer.style.transform = "translateY(6px)";

        setTimeout(() => {
          if (sortType === "price") {
            sortedCards.sort((a, b) => {
              const valA = parseInt(
                a.querySelector(".productNewpriceXl")?.textContent?.replace(/[^0-9]/g, "") || "0",
                10
              );
              const valB = parseInt(
                b.querySelector(".productNewpriceXl")?.textContent?.replace(/[^0-9]/g, "") || "0",
                10
              );
              return valA - valB;
            });
          } else if (sortType === "discount") {
            sortedCards.sort((a, b) => {
              const elA = a.querySelector(".productDiscountXl");
              const elB = b.querySelector(".productDiscountXl");
              const valA = elA
                ? Math.abs(parseInt(elA.textContent?.replace(/[^0-9]/g, "") || "0", 10))
                : 0;
              const valB = elB
                ? Math.abs(parseInt(elB.textContent?.replace(/[^0-9]/g, "") || "0", 10))
                : 0;
              return valB - valA;
            });
          } else if (sortType === "promo") {
            sortedCards.sort((a, b) => {
              const hasA = a.querySelector(".productDiscountXl") ? 1 : 0;
              const hasB = b.querySelector(".productDiscountXl") ? 1 : 0;
              return hasB - hasA;
            });
          }

          productsContainer.innerHTML = "";
          sortedCards.forEach((card) => {
            productsContainer.appendChild(card);
          });

          requestAnimationFrame(() => {
            productsContainer.style.transition =
              "opacity 0.55s cubic-bezier(0.16, 1, 0.3, 1), transform 0.55s cubic-bezier(0.16, 1, 0.3, 1)";
            productsContainer.style.opacity = "1";
            productsContainer.style.transform = "translateY(0)";
          });
        }, 120);
      };

      btn.addEventListener("click", handler);
      handlers.push({ btn, handler });
    });

    return () => {
      handlers.forEach(({ btn, handler }) => {
        btn.removeEventListener("click", handler);
      });
    };
  }, []);
}
