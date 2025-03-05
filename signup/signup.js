import { validateEmail, validatePassword, validateNickname } from '../validator/validationUser.js';

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("signupForm");
    const emailInput = document.getElementById("email");
    const password1Input = document.getElementById("password1");
    const password2Input = document.getElementById("password2");
    const nicknameInput = document.getElementById("nickname");
    const submitButton = document.getElementById("signupBtn");

    emailInput.addEventListener("input", () => validateEmail(emailInput));
    password1Input.addEventListener("input", () => validatePassword(password1Input, password2Input));
    password2Input.addEventListener("input", () => validatePassword(password1Input, password2Input));
    nicknameInput.addEventListener("input", () => validateNickname(nicknameInput));

    // 폼 제출 이벤트
    if(form) {
        form.addEventListener("submit", function (event) {
            event.preventDefault(); // 기본 제출 동작 방지

            // 유효성 검사 후
            const isValidEmail = validateEmail(emailInput);
            const isValidPassword = validatePassword(password1Input, password2Input);
            const isValidNickname = validateNickname(nicknameInput);

            if(isValidEmail && isValidPassword && isValidNickname) {
                submitButton.style.backgroundColor = "#7F6AEE";
                
                alert("회원가입에 성공했습니다.");
                setTimeout(() => {
                    window.location.href = "../login/login.html";
                }, 1000);
            } else {
                alert("회원가입에 실패했습니다.");
            }
        });
    } else {
        console.error("form 요소를 찾을 수 없다.");
    }

    // 로그인 화면으로 이동
    document.getElementById("loginGoBtn").addEventListener("click", function() {
        window.location.href = "../login/login.html";
    });
})