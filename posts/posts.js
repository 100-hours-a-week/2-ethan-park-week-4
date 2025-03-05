document.addEventListener("DOMContentLoaded", () => {
    const postList = document.getElementById("post-list");
    postList.innerHTML = "";
  
    // JSON 파일에서 게시글 데이터를 가져옵니다.
    fetch("../data/post.json")
      .then(response => {
        if (!response.ok) {
          throw new Error("네트워크 응답에 문제가 있습니다.");
        }
        return response.json();
      })
      .then(data => {
        // JSON 파일 구조가 { "posts": [ ... ] } 이므로 posts 배열 추출
        const posts = data.posts;
        // 모든 게시글을 순회하며 렌더링
        posts.forEach(post => {
          const postContainer = document.createElement("div");
          postContainer.classList.add("post");
  
          // 날짜 형식 검사 및 숫자 포맷팅
          const validDate = isValidDateFormat(post.date) ? post.date : "날짜 오류";
          const formattedLikes = formatNumber(post.likes);
          const formattedViews = formatNumber(post.views);
          const formattedComments = formatNumber(post.commentsCnt);
  
          postContainer.innerHTML = `
            <a href="../detail-post/detail-post.html?id=${post.id}" class="post-title">${truncateTitle(post.title)}</a>
            <div class="post-meta">
                <div class="meta-left">
                    <span>좋아요 ${formattedLikes}</span>
                    <span>댓글: ${formattedComments}</span>
                    <span>조회수: ${formattedViews}</span>
                </div>
                <div class="meta-right">${validDate}</div>
            </div>
            <div class="post-author">작성자: ${post.author}</div>
          `;
  
          // 게시글 컨테이너 클릭 시 상세 페이지로 이동
          postContainer.addEventListener("click", () => {
            window.location.href = `../detail-post/detail-post.html?id=${post.id}`;
          });
  
          postList.appendChild(postContainer);
        });
      })
      .catch(error => {
        console.error("게시글 데이터를 불러오는 중 오류 발생:", error);
        alert("게시글을 가져오는 중 오류가 발생했습니다.");
      });
  
    // 게시물 작성 버튼 클릭 시 페이지 이동
    document.getElementById("writePostBtn").addEventListener("click", () => {
      alert("게시물 작성 페이지로 이동합니다.");
      window.location.href = "../make-post/make-post.html";
    });
  });
  
  // 🔹 제목 길이 제한 (최대 26자)
  function truncateTitle(title) {
    return title.length > 26 ? title.slice(0, 26) + "..." : title;
  }
  
  // 🔹 날짜 형식 검사 (yyyy-mm-dd hh:mm:ss)
  function isValidDateFormat(dateStr) {
    const regex = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/;
    return regex.test(dateStr);
  }
  
  // 🔹 숫자 포맷 변환 (예: 12345 → 12k)
  function formatNumber(value) {
    if (value >= 100000) return Math.floor(value / 1000) + "k";
    if (value >= 10000) return Math.floor(value / 1000) + "k";
    if (value >= 1000) return Math.floor(value / 1000) + "k";
    return value;
  }
  