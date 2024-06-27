document.addEventListener('DOMContentLoaded', function() {
    const loginBtn = document.getElementById('login-btn');
    const loginModal = document.getElementById('login-modal');
    const closeBtn = document.querySelectorAll('.close');
    const cancelBtn = document.getElementById('cancel-btn');
    const loginForm = document.getElementById('login-form');
    const photoModal = document.getElementById('photoModal');
    const modalPhoto = document.getElementById('modalPhoto');
    const gridItems = document.querySelectorAll('.grid-container .item img');
    const commentsDiv = document.querySelector('.comments');
    const likeBtn = document.querySelector('#photoModal .like-btn');
    const likeCount = document.querySelector('#photoModal .like-count');
    const commentBtn = document.querySelector('#photoModal .comment-btn');
    const commentCount = document.querySelector('#photoModal .comment-count');
    const commentText = document.getElementById('commentText');
    const submitCommentBtn = document.getElementById('submitComment');
    let isLoggedIn = false;

    loginBtn.addEventListener('click', function() {
        loginModal.style.display = 'block';
    });

    closeBtn.forEach(button => {
        button.addEventListener('click', function() {
            this.closest('.modal').style.display = 'none';
        });
    });

    cancelBtn.addEventListener('click', function() {
        loginModal.style.display = 'none';
    });

    window.addEventListener('click', function(event) {
        if (event.target === loginModal) {
            loginModal.style.display = 'none';
        }
        if (event.target === photoModal) {
            photoModal.style.display = 'none';
        }
    });

    loginForm.addEventListener('submit', function(event) {
        event.preventDefault();
        isLoggedIn = true;
        loginModal.style.display = 'none';
    });

    likeBtn.addEventListener('click', function() {
        if (!isLoggedIn) {
            alert('Por favor, faça login para curtir.');
            return;
        }

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

    submitCommentBtn.addEventListener('click', function() {
        if (!isLoggedIn) {
            alert('Por favor, faça login para comentar.');
            return;
        }

        const userComment = commentText.value;
        if (userComment) {
            const comment = document.createElement('p');
            comment.textContent = userComment;
            commentsDiv.appendChild(comment);

            let count = parseInt(commentCount.textContent);
            count++;
            commentCount.textContent = count;

            commentText.value = '';
        }
    });

    gridItems.forEach(item => {
        item.addEventListener('click', function() {
            if (!isLoggedIn) {
                alert('Por favor, faça login para visualizar a imagem.');
                loginModal.style.display = 'block';
                return;
            }

            modalPhoto.src = this.src;
            photoModal.style.display = 'block';

            // Reset like and comment count in modal
            likeCount.textContent = this.closest('.item').querySelector('.like-count').textContent;
            commentCount.textContent = this.closest('.item').querySelector('.comment-count').textContent;
            likeBtn.dataset.liked = 'false';
            likeBtn.style.color = '#FFFFFF';
            commentsDiv.innerHTML = '';
        });
    });
});

function closePhotoModal() {
    document.getElementById('photoModal').style.display = 'none';
}
