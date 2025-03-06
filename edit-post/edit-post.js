document.addEventListener("DOMContentLoaded", function () {
    const titleInput = document.getElementById("title");
    const contentInput = document.getElementById("content");
    const form = document.getElementById("editForm");
    const imageInput = document.getElementById("imageInput"); // HTML에서 파일 input의 id가 "imageInput"인지 확인하세요.
    const preview = document.getElementById("preview");

    // localStorage에 저장된 데이터가 없다면 기본값 설정 (예시)
    if (!localStorage.getItem("postTitle")) {
        localStorage.setItem("postTitle", "기본 제목");
    }
    if (!localStorage.getItem("postContent")) {
        localStorage.setItem("postContent", "기본 내용");
    }

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

    // 이미지 미리보기 기능
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
            title: titleInput.value,
            content: contentInput.value
        };

        // 콘솔에 PATCH 요청 데이터 출력 (실제 API 요청 시에는 fetch 등을 사용)
        console.log("PATCH 요청 데이터:", updatedData);

        // 로컬 스토리지 업데이트 (예시)
        localStorage.setItem("postTitle", titleInput.value);
        localStorage.setItem("postContent", contentInput.value);

        // 수정 후 페이지 이동 (경로 확인 필요)
        window.location.href = "../posts/posts.html";
    });
});
