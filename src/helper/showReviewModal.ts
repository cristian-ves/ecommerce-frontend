import Swal from "sweetalert2";
import { reviewExistingItem } from "../features/items";
import type { AppDispatch } from "../store";

export interface ReviewPayload {
    id: number;
    rate: number;
}

export const showReviewModal = async (
    itemId: number,
    dispatch: AppDispatch
) => {
    let selectedStars = 0;

    const { value: formValues } = await Swal.fire({
        title: "Review this item",
        html: `
            <div id="stars-container" style="display:flex; justify-content:center; gap:5px; font-size:2rem; margin-bottom:1rem;">
                ${[1, 2, 3, 4, 5]
                    .map(
                        (i) =>
                            `<span data-star="${i}" style="cursor:pointer;">☆</span>`
                    )
                    .join("")}
            </div>
            <textarea id="review-text" class="swal2-textarea" placeholder="Leave a comment (optional)"></textarea>
        `,
        showCancelButton: true,
        confirmButtonText: "Submit",
        didOpen: () => {
            const stars = Swal.getPopup()!.querySelectorAll<HTMLSpanElement>(
                "#stars-container span"
            );
            stars.forEach((star) => {
                star.addEventListener("mouseenter", () => {
                    const value = parseInt(star.dataset.star!);
                    stars.forEach(
                        (s, i) => (s.textContent = i < value ? "★" : "☆")
                    );
                });
                star.addEventListener("click", () => {
                    selectedStars = parseInt(star.dataset.star!);
                    stars.forEach(
                        (s, i) =>
                            (s.textContent = i < selectedStars ? "★" : "☆")
                    );
                });
            });
        },
        preConfirm: () => {
            if (!selectedStars)
                Swal.showValidationMessage("Select at least 1 star");
            return { stars: selectedStars };
        },
    });

    if (formValues) {
        dispatch(reviewExistingItem({ id: itemId, rate: formValues.stars }));

        Swal.fire({
            icon: "success",
            title: "Thanks!",
            text: `You rated ${formValues.stars} star${
                formValues.stars > 1 ? "s" : ""
            }.`,
        });
    }
};
