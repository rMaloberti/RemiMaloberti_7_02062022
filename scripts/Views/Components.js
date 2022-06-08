export class Components {
    appliedFilter = (data) => {
        const { text, type } = data;

        const appliedFilter = document.createElement("div");
        appliedFilter.classList.add("applied-filter");
        appliedFilter.classList.add(`applied-filter--${type}`);

        const filterText = document.createElement("p");
        filterText.classList.add("applied-filter__text");
        filterText.textContent = text;

        appliedFilter.appendChild(filterText);

        return appliedFilter;
    };
}
