// 가짜 데이터 (테스트용)
const posts = [
    { id: 1, title: "이것은 아주 긴 제목입니다. 26자를 초과하는 경우...", like:0, author: "관리자", date: "2025-02-17 12:34:56", views: 12345, comments: 1200 },
    { id: 2, title: "짧은 제목", like:10000, author: "사용자1", date: "2025-02-16 11:00:22", views: 999, comments: 80 },
    { id: 3, title: "게시물 제목 테스트ㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋ", like:0, author: "사용자2", date: "2025-02-15 14:22:11", views: 105000, comments: 3000 },
    { id: 4, title: "게시물 제목 테스트", like:0, author: "사용자2", date: "2025-02-15 14:22:11", views: 105000, comments: 3000 },
    { id: 5, title: "게시물 제목 테스트", like:0, author: "사용자2", date: "2025-02-15 14:22:11", views: 105000, comments: 3000 },
    { id: 6, title: "게시물 제목 테스트", like:0, author: "사용자2", date: "2025-02-15 14:22:11", views: 105000, comments: 3000 },
    { id: 7, title: "게시물 제목 테스트", like:0, author: "사용자2", date: "2025-02-15 14:22:11", views: 105000, comments: 3000 },
    { id: 8, title: "게시물 제목 테스트", like:0, author: "사용자2", date: "2025-02-15 14:22:11", views: 105000, comments: 3000 },
    { id: 9, title: "게시물 제목 테스트", like:0, author: "사용자2", date: "2025-02-15 14:22:11", views: 105000, comments: 3000 },
    { id: 10, title: "게시물 제목 테스트", like:0, author: "사용자2", date: "2025-02-15 14:22:11", views: 105000, comments: 3000 },
    { id: 11, title: "게시물 제목 테스트", like:0, author: "사용자2", date: "2025-02-15 14:22:11", views: 105000, comments: 3000 },
    { id: 12, title: "게시물 제목 테스트", like:0, author: "사용자2", date: "2025-02-15 14:22:11", views: 105000, comments: 3000 },
    { id: 13, title: "게시물 제목 테스트", like:0, author: "사용자2", date: "2025-02-15 14:22:11", views: 105000, comments: 3000 },
];

// 🔹 제목 길이 제한 (최대 26자)
function truncateTitle(title) {
    return title.length > 26 ? title.slice(0, 26) + "..." : title;
}

// 🔹 날짜 형식 검사 (yyyy-mm-dd hh:mm:ss)
function isValidDateFormat(dateStr) {
    const regex = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/;
    return regex.test(dateStr);
}

// 🔹 숫자 포맷 변환 (1k, 10k, 100k)
function formatNumber(value) {
    if (value >= 100000) return Math.floor(value / 1000) + "k";
    if (value >= 10000) return Math.floor(value / 1000) + "k";
    if (value >= 1000) return Math.floor(value / 1000) + "k";
    return value;
}

// 🔹 게시물 리스트 렌더링
function loadPosts() {
    const postList = document.getElementById("post-list");
    postList.innerHTML = "";

    posts.forEach(post => {
        const postContainer = document.createElement("div");
        postContainer.classList.add("post");

        // 유효성 검사 실행
        const validDate = isValidDateFormat(post.date) ? post.date : "날짜 오류";
        const formattedLike = formatNumber(post.like);
        const formattedViews = formatNumber(post.views);
        const formattedComments = formatNumber(post.comments);
        
        postContainer.innerHTML = `
            <a href="detail-post/detail-post.html?id=${post.id}" class="post-title">${truncateTitle(post.title)}</a>
            <div class="post-meta">
                <div class="meta-left">
                    <span>좋아요 ${formattedLike}</span>
                    <span>댓글: ${formattedComments}</span>
                    <span>조회수: ${formattedViews}</span>
                </div>
                <div class="meta-right">${validDate}</div>
            </div>
            
            <div class="post-author">작성자: ${post.author}</div>
        `;

        postContainer.addEventListener("click", () => {
            window.location.href = `detail-post/detail-post.html?id=${post.id}`;
        });

        postList.appendChild(postContainer);
    });
}

// 🔹 페이지 로드 시 게시물 불러오기
window.onload = loadPosts;

// 🔹 게시물 작성 버튼 클릭 시 이동
document.getElementById("writePostBtn").addEventListener("click", function() {
    alert("게시물 작성 페이지로 이동합니다.");
    window.location.href = "../make-post/make-post.html";
});


// 🔹 더 많은 게시물 로드
function loadMorePosts() {
    const postList = document.getElementById("post-list");
    const loadedCount = postList.childElementCount;

    if (loadedCount >= posts.length) {
        return; // 모든 게시물을 로드했으면 더 이상 로드하지 않음
    }

    posts.slice(loadedCount, loadedCount + 3).forEach(post => {
        const postContainer = document.createElement("div");
        postContainer.classList.add("post");

        // 유효성 검사 실행
        const validDate = isValidDateFormat(post.date) ? post.date : "날짜 오류";
        const formattedViews = formatNumber(post.views);
        const formattedComments = formatNumber(post.comments);

        postContainer.innerHTML = `
            <a href="../detail-post/detail-post.html?id=${post.id}" class="post-title">${truncateTitle(post.title)}</a>
            <div class="post-meta">
                <div class="meta-left">
                    <span>좋아요 ${post.like}</span>
                    <span>댓글: ${formattedComments}</span>
                    <span>조회수: ${formattedViews}</span>
                </div>
                
                <div class="meta-right">${validDate}</div>
            </div>
            <div class="post-author">작성자: ${post.author}</div>
        `;

        postContainer.addEventListener("click", () => {
            window.location.href = `../detail-post/detail-post.html?id=${post.id}`;
        });

        postList.appendChild(postContainer);
    });
}

// 🔹 스크롤 이벤트로 더 많은 게시물 로드
function handleScroll() {
    const postList = document.getElementById("post-list");
    const scrollPosition = window.scrollY + window.innerHeight;
    const bottomPosition = document.documentElement.scrollHeight;

    if (scrollPosition >= bottomPosition - 100) {
        loadMorePosts();
    }
}

// 🔹 페이지 로드 시 게시물 불러오기
window.onload = loadPosts;

// 🔹 스크롤 이벤트 리스너 추가
window.addEventListener("scroll", handleScroll);