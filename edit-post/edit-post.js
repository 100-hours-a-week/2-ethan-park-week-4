document.addEventListener("DOMContentLoaded", function () {
    const titleInput = document.getElementById("title");
    const contentInput = document.getElementById("content");
    const form = document.getElementById("editForm");
    const imageInput = document.getElementById("imageInput"); // 이미지 업로드 요소
    const preview = document.getElementById("preview"); // 이미지 미리보기 요소

    // localStorage에서 데이터 가져오기
    titleInput.value = localStorage.getItem("postTitle") || "";
    contentInput.value = localStorage.getItem("postContent") || "";

    // 제목 길이 제한 (최대 26자)
    titleInput.addEventListener("input", function () {
        if (this.value.length > 26) {
            alert("제목은 최대 26자까지 입력 가능합니다.");
            this.value = this.value.slice(0, 26);
        }
    });

    // 이미지 미리보기 기능 (imageInput 요소가 존재하는 경우만 실행)
    if (imageInput) {
        imageInput.addEventListener("change", function () {
            const file = this.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function (e) {
                    preview.src = e.target.result;
                };
                reader.readAsDataURL(file);
            }
        });
    }

    // 수정 버튼 클릭 시 데이터 PATCH 처리
    form.addEventListener("submit", function (event) {
        event.preventDefault(); // 기본 제출 방지

        // 변경된 데이터 저장
        const updatedData = {
            ...postData, // 기존 데이터 유지
            title: titleInput.value, // 제목 수정
            content: contentInput.value // 내용 수정
        };

        // 콘솔에서 PATCH 요청 확인 (실제 API 요청 대신 사용)
        console.log("PATCH 요청 데이터:", updatedData);

        // 페이지 이동 전 URL 확인 (디버깅용)
        console.log("이동할 URL:", window.location.origin + "/detail-post.html");

        // 페이지 이동 (경로 확인 후 수정 필요)
        window.location.href = "../detail-post/detail-post.html"; // 같은 폴더에 detail-post.html이 있는 경우
    });
});
