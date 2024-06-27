document.addEventListener('DOMContentLoaded', function() {
    const loginBtn = document.getElementById('login-btn');
    const loginModal = document.getElementById('login-modal');
    const closeBtn = document.querySelector('.close');
    const cancelBtn = document.getElementById('cancel-btn');
    const loginForm = document.getElementById('login-form');
    let isLoggedIn = false;

    loginBtn.addEventListener('click', function() {
        loginModal.style.display = 'block';
    });

    closeBtn.addEventListener('click', function() {
        loginModal.style.display = 'none';
    });

    cancelBtn.addEventListener('click', function() {
        loginModal.style.display = 'none';
    });

    window.addEventListener('click', function(event) {
        if (event.target === loginModal) {
            loginModal.style.display = 'none';
        }
    });

    loginForm.addEventListener('submit', function(event) {
        event.preventDefault();
        isLoggedIn = true;
        loginModal.style.display = 'none';
    });

    const likeButtons = document.querySelectorAll('.like-btn');
    const commentButtons = document.querySelectorAll('.comment-btn');

    likeButtons.forEach(button => {
        button.addEventListener('click', function() {
            if (!isLoggedIn) {
                alert('Por favor, faça login para curtir.');
                return;
            }

            const likeCount = this.nextElementSibling;
            let count = parseInt(likeCount.textContent);

            if (this.dataset.liked === 'true') {
                count--;
                this.dataset.liked = 'false';
                this.style.color = '#FFFFFF';
            } else {
                count++;
                this.dataset.liked = 'true';
                this.style.color = '#C60E0E';
            }

            likeCount.textContent = count;
        });
    });

    commentButtons.forEach(button => {
        button.addEventListener('click', function() {
            if (!isLoggedIn) {
                alert('Por favor, faça login para comentar.');
                return;
            }

            const commentCount = this.nextElementSibling;
            let count = parseInt(commentCount.textContent);

            // Abrir popup/modal de comentário (simulação)
            const userComment = prompt('Digite seu comentário:');
            if (userComment) {
                count++;
                commentCount.textContent = count;
            }
        });
    });
});
