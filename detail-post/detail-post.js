document.addEventListener("DOMContentLoaded", function () {
    // 1. URL에서 게시글 id 추출
    const urlParams = new URLSearchParams(window.location.search);
    const postId = Number(urlParams.get("id"));
  
    // 2. DOM 요소 가져오기
    const postTitleElem = document.getElementById("post-title");
    const postContentElem = document.getElementById("post-content");
    const viewCountElem = document.getElementById("view-count");
    const likeCountElem = document.getElementById("like-count");
  
    const editButton = document.getElementById("edit-btn");
    const deleteButton = document.getElementById("delete-btn");
    const modal = document.getElementById("delete-modal");
    const cancelButton = document.getElementById("cancel-btn");
    const confirmDeleteButton = document.getElementById("confirm-delete-btn");
  
    const commentInput = document.getElementById("comment-input");
    const addCommentBtn = document.getElementById("submit-comment");
    const commentList = document.getElementById("comments");
    const commentCount = document.getElementById("comment-count");
  
    const commentDeleteModal = document.getElementById("comment-delete-modal");
    const cancelCommentButton = document.getElementById("cancel-comment-btn");
    const confirmCommentDeleteButton = document.getElementById("confirm-comment-delete-btn");
  
    let postData = null;
    let editingIndex = null;      // 댓글 수정 중인 인덱스
    let currentCommentIndex = null; // 삭제할 댓글 인덱스
  
    // 3. 유틸리티 함수들
    function formatCount(num) {
      if (num >= 1000000) return (num / 1000000).toFixed(1) + "M";
      if (num >= 1000) return (num / 1000).toFixed(1) + "k";
      return num.toString();
    }
  
    function isValidDateFormat(dateStr) {
      const regex = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/;
      return regex.test(dateStr);
    }
  
    function formatNumber(value) {
      if (value >= 100000) return Math.floor(value / 1000) + "k";
      if (value >= 10000) return Math.floor(value / 1000) + "k";
      if (value >= 1000) return Math.floor(value / 1000) + "k";
      return value.toString();
    }
  
    function truncateTitle(title) {
      return title.length > 26 ? title.slice(0, 26) + "..." : title;
    }
  
    // 4. 댓글 렌더링 함수 (리스트 내부에 <li> 요소를 사용)
    function renderComments(comments) {
      commentList.innerHTML = "";
      comments.forEach((comment, index) => {
        let li = document.createElement("li"); // <li> 요소 사용
        li.classList.add("comment");
        // 댓글 내용 표시 (필요시 작성자, 날짜 등 추가 가능)
        li.innerHTML = `<span>${comment.content}</span>`;
  
        // 댓글 수정 버튼
        let editBtn = document.createElement("button");
        editBtn.textContent = "수정";
        editBtn.onclick = function () {
          commentInput.value = comment.content;
          editingIndex = index;
          addCommentBtn.textContent = "댓글 수정";
        };
  
        // 댓글 삭제 버튼
        let deleteBtn = document.createElement("button");
        deleteBtn.textContent = "삭제";
        deleteBtn.onclick = function () {
          showDeleteCommentModal(index);
        };
  
        li.appendChild(editBtn);
        li.appendChild(deleteBtn);
        commentList.appendChild(li);
      });
      commentCount.innerText = comments.length;
      resetCommentButton();
    }
  
    function resetCommentButton() {
      addCommentBtn.textContent = "댓글 등록";
      editingIndex = null;
    }
  
    // 5. 댓글 추가 및 수정 처리 함수
    function handleComment() {
      let commentText = commentInput.value.trim();
      if (!commentText) return;
  
      if (editingIndex !== null) {
        // 기존 댓글 수정
        postData.comments[editingIndex].content = commentText;
        editingIndex = null;
      } else {
        // 새 댓글 추가 (임시 id와 현재 시간을 사용, isMyComent 키 사용)
        const newComment = {
          id: Date.now(),
          author: "CurrentUser",
          content: commentText,
          date: new Date().toISOString().slice(0, 19).replace("T", " "),
          isMyComent: true
        };
        postData.comments.push(newComment);
      }
      renderComments(postData.comments);
      commentInput.value = "";
      resetCommentButton();
    }
  
    addCommentBtn.addEventListener("click", handleComment);
    commentInput.addEventListener("input", function () {
      addCommentBtn.disabled = !this.value.trim();
    });
  
    // 6. 댓글 삭제 모달 관련 함수
    function showDeleteCommentModal(index) {
      currentCommentIndex = index;
      commentDeleteModal.style.display = "block";
    }
  
    cancelCommentButton.addEventListener("click", function () {
      commentDeleteModal.style.display = "none";
    });
  
    confirmCommentDeleteButton.addEventListener("click", function () {
      if (currentCommentIndex !== null) {
        postData.comments.splice(currentCommentIndex, 1);
        renderComments(postData.comments);
      }
      commentDeleteModal.style.display = "none";
    });
  
    // 7. 게시글 데이터 fetch 및 초기 렌더링
    fetch("../data/post.json")
      .then(response => {
        if (!response.ok) {
          throw new Error("네트워크 응답에 문제가 있습니다.");
        }
        return response.json();
      })
      .then(data => {
        // JSON 구조: { "posts": [ ... ] }에서 id에 해당하는 게시글 찾기
        postData = data.posts.find(post => post.id === postId);
        if (!postData) {
          throw new Error("해당 게시글을 찾을 수 없습니다.");
        }
        // 게시글 상세 정보 반영
        postTitleElem.innerText = postData.title;
        postContentElem.innerText = postData.content;
        viewCountElem.innerText = formatCount(postData.views);
        likeCountElem.innerText = formatCount(postData.likes);
  
        // 게시글 수정 버튼 이벤트
        editButton.addEventListener("click", function () {
          localStorage.setItem("postTitle", postData.title);
          localStorage.setItem("postContent", postData.content);
          window.location.href = "../edit-post/edit-post.html";
        });
  
        // 게시글 삭제 버튼 및 모달 이벤트
        deleteButton.addEventListener("click", function () {
          modal.style.display = "block";
        });
        cancelButton.addEventListener("click", function () {
          modal.style.display = "none";
        });
        confirmDeleteButton.addEventListener("click", function () {
          if (postTitleElem) {
            alert("삭제되었습니다.");
            window.location.href = "../posts/posts.html";
          } else {
            alert("삭제할 요소가 존재하지 않습니다.");
          }
          modal.style.display = "none";
        });
  
        // 댓글 데이터는 postData 내에 포함되어 있음
        if (!postData.comments) {
          postData.comments = [];
        }
        renderComments(postData.comments);
      })
      .catch(error => {
        console.error("게시글 데이터를 불러오는 중 오류 발생:", error);
        alert("게시글을 가져오는 중 오류가 발생했습니다.");
      });
  });
  