export class Components {
    appliedFilter = (data) => {
        /* Component properties */
        const { text, type } = data;

        /* Component wrapper */
        const appliedFilter = document.createElement("div");
        appliedFilter.classList.add("applied-filter");
        appliedFilter.classList.add(`applied-filter--${type}`);

        /* Text */
        const filterText = document.createElement("p");
        filterText.classList.add("applied-filter__text");
        filterText.textContent = text;
        /* END Text */

        /* Remove button */
        const removeBtn = document.createElement("button");
        removeBtn.classList.add("remove-filter");
        removeBtn.setAttribute("type", "button");

        /* Remove icon */
        const removeIcon = document.createElement("i");
        removeIcon.classList.add("remove-filter__icon");
        /* END Remove icon */

        removeBtn.appendChild(removeIcon);
        /* END Remove button */

        appliedFilter.appendChild(filterText);
        appliedFilter.appendChild(removeBtn);
        /* END Component wrapper */

        return appliedFilter;
    };
}
