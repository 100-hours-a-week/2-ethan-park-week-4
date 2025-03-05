import { validateForm } from "../validator/validationPost";

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("postForm");
    const titleInput = document.getElementById("title");
    const contentInput = document.getElementById("content");
    const imageInput = document.getElementById("image");
    const imagePreview = document.getElementById("imagePreview");
    const submitButton = document.getElementById("submitButton");
    const errorMessage = document.getElementById("postInput-error");

    // 전체 폼의 유효성을 체크하고 버튼 활성화/비활성화 처리하는 함수
    function checkFormValidity() {
        const isValidTitle = validateForm(titleInput);
        const isValidContent = validateForm(contentInput);
        // 두 필드가 모두 유효하면 버튼 활성화, 아니면 비활성화
        submitButton.disabled = !(isValidTitle && isValidContent);
    }
    // 제목, 내용 입력 감지
    titleInput.addEventListener("input", () => {
        validateForm(titleInput);
        checkFormValidity();
    });
    contentInput.addEventListener("input", () => {
        validateForm(contentInput);
        checkFormValidity();
    });

    // 이미지 업로드 미리보기
    imageInput.addEventListener("change", function(event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                imagePreview.src = e.target.result;
                imagePreview.style.display = "block";
            };
            reader.readAsDataURL(file);
        } else {
            imagePreview.style.display = "none";
        }
    });

    if(form) {
        form.addEventListener("submit", function (event) {
            event.preventDefault();

            const isValidTitle = validateForm(titleInput);
            const isValidContent = validateForm(contentInput);

            if(isValidTitle && isValidContent) {
                submitButton.classList.add("active");
                errorMessage.style.display = "none";
                
                alert("게시글이 작성되었습니다!");
                
                // 서버에 전송하는 로직 추가 가능

                // 🚀 post.html로 리다이렉트
                window.location.href = "../posts/posts.html";
            }
            else {
                errorMessage.style.display = "block";
                errorMessage.textContent = "제목과 내용을 모두 작성해주세요.";
            }
        })
    }
})