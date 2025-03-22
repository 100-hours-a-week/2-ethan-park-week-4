document.addEventListener("DOMContentLoaded", function () {
    const titleInput = document.getElementById("title");
    const contentInput = document.getElementById("content");
    const form = document.getElementById("editForm");
    const imageInput = document.getElementById("imageInput");
    const previewContainer = document.getElementById("previewContainer");
  
    // 초기값 설정
    titleInput.value = localStorage.getItem("postTitle") || "";
    contentInput.value = localStorage.getItem("postContent") || "";
  
    // 제목 길이 제한
    titleInput.addEventListener("input", function () {
      if (this.value.length > 26) {
        alert("제목은 최대 26자까지 입력 가능합니다.");
        this.value = this.value.slice(0, 26);
      }
    });
  
    // 이미지 미리보기
    imageInput.addEventListener("change", function () {
      const files = Array.from(this.files);
      previewContainer.innerHTML = ""; // 기존 미리보기 초기화
  
      if (files.length < 1 || files.length > 10) {
        alert("이미지는 최소 1개, 최대 10개까지 업로드 가능합니다.");
        imageInput.value = ""; // 파일 초기화
        return;
      }
  
      files.forEach(file => {
        const reader = new FileReader();
        reader.onload = function (e) {
          const img = document.createElement("img");
          img.src = e.target.result;
          img.style.width = "100px";
          img.style.height = "100px";
          img.style.objectFit = "cover";
          previewContainer.appendChild(img);
        };
        reader.readAsDataURL(file);
      });
    });
  
    // 수정 제출
    form.addEventListener("submit", async function (event) {
      event.preventDefault();
  
      const files = Array.from(imageInput.files);
      if (files.length < 1 || files.length > 10) {
        alert("이미지는 최소 1개, 최대 10개까지 업로드해야 합니다.");
        return;
      }
  
      const formData = new FormData();
      formData.append("title", titleInput.value);
      formData.append("content", contentInput.value);
  
      files.forEach((file, index) => {
        formData.append("images", file); // 백엔드에서 images[] 또는 images로 받을 수 있도록 설정
      });
  
      try {
        const postId = localStorage.getItem("postId") || "1"; // 예시용
        const response = await fetch(`http://localhost:8080/api/posts/${postId}`, {
          method: "PATCH",
          body: formData,
        });
  
        if (!response.ok) throw new Error("수정 실패");
  
        const result = await response.json();
        alert("수정이 완료되었습니다.");
        window.location.href = "../posts/posts.html";
      } catch (error) {
        console.error("수정 오류:", error);
        alert("수정 중 문제가 발생했습니다.");
      }
    });
  });
  