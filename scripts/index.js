const filtersButtons = document.querySelectorAll(".filters-btn");

const openFilterBtn = (e) => {
    e.stopPropagation();
    e.currentTarget.removeEventListener("click", openFilterBtn);

    e.currentTarget.classList.remove("filters-btn--closed");
    e.currentTarget.classList.add("filters-btn--opened");

    const toggle = e.currentTarget.querySelector(".filters-btn-toggle");
    toggle.addEventListener("click", closeFilterBtn);
};

const closeFilterBtn = (e) => {
    e.stopPropagation();
    e.currentTarget.removeEventListener("click", closeFilterBtn);

    const filtersBtn = e.currentTarget.parentElement.parentElement;
    filtersBtn.classList.remove("filters-btn--opened");
    filtersBtn.classList.add("filters-btn--closed");

    filtersBtn.addEventListener("click", openFilterBtn);
};

filtersButtons.forEach((filtersBtn) => {
    filtersBtn.addEventListener("click", openFilterBtn);
});
