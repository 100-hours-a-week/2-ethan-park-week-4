// 게시물 데이터 (JS에서 관리)
const postData = {
    title: "잃어버린 편지",
    content: `비 오는 오후, 지하철역 한구석에 앉아 있던 윤서는 우연히 바닥에 떨어진 편지 한 장을 발견했다. 비에 젖어 모서리가 구겨졌지만, 누군가 정성스럽게 쓴 흔적이 역력했다.

    호기심에 조심스럽게 펼쳐 보았다.
    
    "오랜 시간이 흘렀지만, 난 여전히 네가 보고 싶어. 우리가 마지막으로 만난 날, 네가 흘린 눈물을 잊을 수가 없어. 다시 만날 수 있다면, 난 그때처럼 널 놓치지 않을 거야."
    
    윤서는 순간 심장이 덜컥 내려앉았다. 글씨체가 너무도 익숙했다.
    
    그녀는 떨리는 손으로 편지를 접고 두리번거렸다. 혹시라도 이 편지를 쓴 사람이 근처에 있지는 않을까? 하지만 역 안에는 바삐 움직이는 사람들뿐, 편지의 주인으로 보이는 이는 없었다.
    
    윤서는 한숨을 쉬고 편지를 가방에 넣었다. 하지만 집으로 돌아오는 길에도, 밤이 깊어질 때까지도, 그녀의 머릿속을 떠나지 않는 단 한 가지 생각이 있었다.
    
    "혹시... 지훈일까?"
    
    그날 이후, 그녀는 매일 같은 지하철역을 찾았다. 그리고 마침내, 편지를 쓴 사람을 마주한 순간, 그녀는 알 수 있었다.
    
    과거는 지나갔어도, 어떤 감정들은 사라지지 않는다는 것을.`,
    views: 1230,
    likes: 1000000,
    comments: []
};

// 조회수, 좋아요 변환 함수
function formatCount(num) {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + "M";
    if (num >= 1000) return (num / 1000).toFixed(1) + "k";
    return num.toString();
}

document.addEventListener("DOMContentLoaded", function () {
    // 게시물 데이터 반영
    document.getElementById("post-title").innerText = postData.title;
    document.getElementById("post-content").innerText = postData.content;
    document.getElementById("view-count").innerText = formatCount(postData.views);
    document.getElementById("like-count").innerText = formatCount(postData.likes);

    const editButton = document.getElementById("edit-btn");
    const deleteButton = document.getElementById("delete-btn");
    const modal = document.getElementById("delete-modal");
    const cancelButton = document.getElementById("cancel-btn");
    const confirmDeleteButton = document.getElementById("confirm-delete-btn");

    const commentDeleteModal = document.getElementById("comment-delete-modal");
    const cancelCommentButton = document.getElementById("cancel-comment-btn");
    const confirmCommentDeleteButton = document.getElementById("confirm-comment-delete-btn");

    let currentCommentIndex = null; // 현재 삭제할 댓글 인덱스

    // 댓글 삭제 모달 관련
    function showDeleteCommentModal(index) {
        currentCommentIndex = index;
        commentDeleteModal.style.display = "block"; // 모달 표시
    }

    cancelCommentButton.addEventListener("click", function () {
        commentDeleteModal.style.display = "none"; // 모달 닫기
    });

    confirmCommentDeleteButton.addEventListener("click", function () {
        if (currentCommentIndex !== null) {
            postData.comments.splice(currentCommentIndex, 1); // 해당 댓글 삭제
            renderComments();
        }
        commentDeleteModal.style.display = "none"; // 모달 닫기
    });

    // detail-post.js (수정 버튼 클릭 시 데이터 저장 후 페이지 이동)
    editButton.addEventListener("click", function () {
        localStorage.setItem("postTitle", postData.title);
        localStorage.setItem("postContent", postData.content);
        window.location.href = "../edit-post/edit-post.html";
    });


    deleteButton.addEventListener("click", function () {
        modal.style.display = "block"; // 모달 표시
    });

    cancelButton.addEventListener("click", function () {
        modal.style.display = "none"; // 모달 닫기
    });

    confirmDeleteButton.addEventListener("click", function () {
        const target = document.getElementById("post-title");
        if (target) {
            alert("삭제되었습니다.");
            window.location.href = "../posts/posts.html";
        } else {
            alert("삭제할 요소가 존재하지 않습니다.");
        }
        modal.style.display = "none"; // 모달 닫기
    });

    // 댓글 기능
    let commentInput = document.getElementById("comment-input");
    let addCommentBtn = document.getElementById("submit-comment");
    let commentList = document.getElementById("comments");
    let commentCount = document.getElementById("comment-count");

    // 댓글 입력 시 버튼 활성화
    commentInput.addEventListener("input", function () {
        addCommentBtn.disabled = !this.value.trim();
    });

    // 댓글 추가 함수
    function addComment() {
        let commentText = commentInput.value.trim();
        if (!commentText) return;

        postData.comments.push(commentText);
        renderComments();
        commentInput.value = "";
        addCommentBtn.disabled = true;
    }

    let editingIndex = null; // 🔹 현재 수정 중인 댓글의 인덱스를 추적

    // 댓글 목록 업데이트
    function renderComments() {
        commentList.innerHTML = "";
        postData.comments.forEach((comment, index) => {
            let li = document.createElement("div");
            li.classList.add("comment");
            li.innerHTML = `<span>${comment}</span>`;

            // 수정 버튼
            let editBtn = document.createElement("button");
            editBtn.textContent = "수정";
            editBtn.onclick = function () {
                commentInput.value = postData.comments[index]; // 기존 댓글을 입력창에 표시
                editingIndex = index; // 🔹 수정할 댓글의 인덱스를 저장
                addCommentBtn.textContent = "댓글 수정";
            };

            // 삭제 버튼
            let deleteBtn = document.createElement("button");
            deleteBtn.textContent = "삭제";
            deleteBtn.onclick = function () {
                showDeleteCommentModal(index);
            };

            li.appendChild(editBtn);
            li.appendChild(deleteBtn);
            commentList.appendChild(li);
        });

        commentCount.innerText = postData.comments.length;
        resetCommentButton();
    }

    // 댓글 추가 및 수정 처리
    function handleComment() {
        let commentText = commentInput.value.trim();
        if (!commentText) return;

        if (editingIndex !== null) {
            // ✅ 기존 댓글을 삭제하고 새로운 내용으로 변경
            postData.comments[editingIndex] = commentText;
            editingIndex = null; // 🔹 수정 모드 종료
        } else {
            // ✅ 새 댓글 추가
            postData.comments.push(commentText);
        }

        renderComments();
        commentInput.value = "";
        resetCommentButton();
    }

    // 댓글 버튼 초기화
    function resetCommentButton() {
        addCommentBtn.textContent = "댓글 등록";
        editingIndex = null; // 🔹 수정 모드 해제
    }

    // 댓글 버튼 클릭 이벤트
    addCommentBtn.addEventListener("click", handleComment);
})
