(function () {
    'use strict';

    document.addEventListener('DOMContentLoaded', () => {
        const form = document.getElementById('contactForm');

        form.addEventListener('submit', function (e) {
            e.preventDefault();
            const name = form.elements['name'].value.trim();
            const email = form.elements['email'].value.trim();
            const message = form.elements['message'].value.trim();

            if (!name || !email || !message) {
                e.preventDefault();
                showError('Заполните все поля пожалуйста');
                return;
            }

            const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            if (!emailPattern.test(email)) {
                e.preventDefault();
                showError('Введите корректный email');
                return;
            }

            showSuccessPopup('Сообщение успешно отправлено');
        });

        function showError(text) {
            removeExisting('.form-error');
            const div = document.createElement('div');
            div.className = 'form-error';
            div.textContent = text;
            Object.assign(div.style, {
                background: '#fdecea',
                color: '#b00020',
                border: '1px solid #f5c6cb',
                padding: '10px',
                marginBottom: '10px',
                borderRadius: '4px',
                fontSize: '14px'
            });
            form.prepend(div);
            setTimeout(() => { if (div.parentNode) div.remove(); }, 5000);
        }

        function showSuccessPopup(text) {
            removeExisting('.form-success-popup');

            const overlay = document.createElement('div');
            overlay.className = 'form-success-popup';
            Object.assign(overlay.style, {
                position: 'fixed',
                inset: '0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'rgba(0,0,0,0.4)',
                zIndex: 10000
            });

            const box = document.createElement('div');
            Object.assign(box.style, {
                background: '#ffffff',
                padding: '25px 30px',
                borderRadius: '12px',
                boxShadow: '0 4px 15px rgba(30, 125, 59, 0.3)',
                maxWidth: '400px',
                width: '90%',
                textAlign: 'center',
                fontSize: '18px',
                fontWeight: '600',
                color: '#1e7d3b',
                fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
                lineHeight: '1.4',
                userSelect: 'none',
                transition: 'transform 0.3s ease',
            });

            box.textContent = text;
            box.addEventListener('mouseenter', () => box.style.transform = 'scale(1.05)');
            box.addEventListener('mouseleave', () => box.style.transform = 'scale(1)');

            const btn = document.createElement('button');
            btn.textContent = 'Ок';
            Object.assign(btn.style, {
                marginTop: '20px',
                padding: '10px 24px',
                borderRadius: '8px',
                border: 'none',
                background: '#1e7d3b',
                color: '#ffffff',
                cursor: 'pointer',
                fontSize: '16px',
                fontWeight: '600',
                fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
                boxShadow: '0 3px 8px rgba(30, 125, 59, 0.4)',
                transition: 'background-color 0.3s ease, box-shadow 0.3s ease',
            });

            btn.addEventListener('mouseenter', () => {
                btn.style.backgroundColor = '#145223';
                btn.style.boxShadow = '0 5px 12px rgba(20, 82, 35, 0.6)';
            });
            btn.addEventListener('mouseleave', () => {
                btn.style.backgroundColor = '#1e7d3b';
                btn.style.boxShadow = '0 3px 8px rgba(30, 125, 59, 0.4)';
            });

            btn.addEventListener('click', () => {
                if (overlay.parentNode) overlay.remove();
            });

            box.appendChild(btn);
            overlay.appendChild(box);
            document.body.appendChild(overlay);

        }

        function removeExisting(selector) {
            const ex = document.querySelector(selector);
            if (ex) ex.remove();
        }
    });



    function qs(sel, root = document) { return root.querySelector(sel); }
    function qsa(sel, root = document) { return Array.from(root.querySelectorAll(sel)); }
    function on(root, event, selector, handler) {
        root.addEventListener(event, function (e) {
            const target = e.target.closest(selector);
            if (target && root.contains(target)) handler.call(target, e);
        });
    }


    const submitBtn = document.getElementById('submitOrder');
    const popup = document.getElementById('successPopup');
    const closeBtn = document.getElementById('closePopup');
    const form = document.getElementById('orderForm'); // Добавьте id формы в HTML

    // Получаем все обязательные поля с атрибутом required
    const requiredFields = form.querySelectorAll('[required]');

    function checkFormValidity() {
        let allFilled = true;
        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                allFilled = false;
            }
        });

        submitBtn.disabled = !allFilled;

        if (submitBtn.disabled) {
            submitBtn.style.backgroundColor = '#a5d6a7';
            submitBtn.style.cursor = 'not-allowed';
            submitBtn.style.boxShadow = 'none';
        } else {
            submitBtn.style.backgroundColor = '#1e7d3b';
            submitBtn.style.cursor = 'pointer';
            submitBtn.style.boxShadow = '0 4px 12px rgba(30,125,59,0.4)';
        }
    }

    requiredFields.forEach(field => {
        field.addEventListener('input', checkFormValidity);
    });

    // Проверка состояния кнопки при загрузке страницы
    checkFormValidity();

    function showPopup() {
        popup.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
        closeBtn.focus();
    }

    function hidePopup() {
        popup.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
        submitBtn.focus();
    }

    submitBtn.addEventListener('click', (e) => {
        e.preventDefault();
        showPopup();
    });

    closeBtn.addEventListener('click', hidePopup);

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && popup.getAttribute('aria-hidden') === 'false') {
            hidePopup();
        }
    });

    popup.addEventListener('click', (e) => {
        if (e.target === popup) {
            hidePopup();
        }
    });

    Object.assign(submitBtn.style, {
        padding: '12px 28px',
        borderRadius: '8px',
        border: 'none',
        color: '#fff',
        fontSize: '16px',
        fontWeight: '600',
        cursor: 'pointer',
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        boxShadow: '0 4px 12px rgba(30,125,59,0.4)',
        transition: 'background-color 0.3s ease, box-shadow 0.3s ease',
    });

    submitBtn.addEventListener('mouseenter', () => {
        if (!submitBtn.disabled) {
            submitBtn.style.backgroundColor = '#145223';
            submitBtn.style.boxShadow = '0 6px 16px rgba(20,82,35,0.6)';
        }
    });
    submitBtn.addEventListener('mouseleave', () => {
        if (!submitBtn.disabled) {
            submitBtn.style.backgroundColor = '#1e7d3b';
            submitBtn.style.boxShadow = '0 4px 12px rgba(30,125,59,0.4)';
        }
    });

    Object.assign(popup.style, {
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: '#fff',
        padding: '30px 40px',
        borderRadius: '12px',
        boxShadow: '0 8px 24px rgba(30,125,59,0.3)',
        maxWidth: '300px',
        maxHeight: '250px',
        width: '90%',
        textAlign: 'center',
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        fontSize: '18px',
        color: '#1e7d3b',
        zIndex: '1001',
        display: 'none',
    });

    popup.setAttribute('aria-hidden', 'true');

    const observer = new MutationObserver(() => {
        popup.style.display = popup.getAttribute('aria-hidden') === 'false' ? 'block' : 'none';
    });
    observer.observe(popup, { attributes: true, attributeFilter: ['aria-hidden'] });

    Object.assign(closeBtn.style, {
        marginTop: '24px',
        padding: '10px 26px',
        borderRadius: '8px',
        border: 'none',
        backgroundColor: '#1e7d3b',
        color: '#fff',
        cursor: 'pointer',
        fontSize: '16px',
        fontWeight: '600',
        boxShadow: '0 4px 12px rgba(30,125,59,0.4)',
    });

    closeBtn.addEventListener('mouseenter', () => {
        closeBtn.style.backgroundColor = '#145223';
        closeBtn.style.boxShadow = '0 6px 16px rgba(20,82,35,0.6)';
    });
    closeBtn.addEventListener('mouseleave', () => {
        closeBtn.style.backgroundColor = '#1e7d3b';
        closeBtn.style.boxShadow = '0 4px 12px rgba(30,125,59,0.4)';
    });



    /* TOAST */
    const toastEl = qs('#toast');
    let toastTimer = null;
    window.showToast = function (text, ms = 3000) {
        if (!toastEl) {
            console.log('Toast:', text);
            return;
        }
        toastEl.textContent = text;
        toastEl.classList.remove('hidden');
        toastEl.classList.add('show');
        if (toastTimer) clearTimeout(toastTimer);
        toastTimer = setTimeout(() => {
            toastEl.classList.remove('show');
            toastEl.classList.add('hidden');
            toastTimer = null;
        }, ms);
    };


    /* COOKIE BANNER */
    const COOKIE_KEY = 'site_cookies_accepted';
    const cookieBanner = qs('#cookieBanner');
    const cookieAcceptBtn = qs('#cookieAccept');
    const cookieRejectBtn = qs('#cookieReject');

    function setCookieAccepted(value) {
        try { localStorage.setItem(COOKIE_KEY, value ? '1' : '0'); } catch (e) { }
    }
    function getCookieAccepted() {
        try { return localStorage.getItem(COOKIE_KEY) === '1'; } catch (e) { return false; }
    }

    if (cookieBanner) {
        if (!getCookieAccepted()) cookieBanner.classList.remove('hidden');
        else cookieBanner.classList.add('hidden');
    }
    if (cookieAcceptBtn) cookieAcceptBtn.addEventListener('click', function () {
        setCookieAccepted(true);
        if (cookieBanner) cookieBanner.classList.add('hidden');
        showToast('Куки приняты');
    });
    if (cookieRejectBtn) cookieRejectBtn.addEventListener('click', function () {
        setCookieAccepted(false);
        if (cookieBanner) cookieBanner.classList.add('hidden');
        showToast('Куки не приняты');
    });


    const buyBtn = document.getElementById('buyBtn');
    const quantitySelect = document.getElementById('quantity');

    if (buyBtn && quantitySelect) {
        buyBtn.addEventListener('click', () => {
            const current = parseInt(quantitySelect.value, 10) || 0;
            const next = current + 1;

            const nextOption = quantitySelect.querySelector(`option[value="${next}"]`);
            if (nextOption) {
                quantitySelect.value = String(next);
                quantitySelect.dispatchEvent(new Event('change', { bubbles: true }));
                return;
            }

            const newOption = document.createElement('option');
            newOption.value = String(next);
            newOption.textContent = String(next);
            quantitySelect.appendChild(newOption);
            quantitySelect.value = String(next);
            quantitySelect.dispatchEvent(new Event('change', { bubbles: true }));
        });
    }



    /* CATALOG */
    (function initCatalog() {
        const productsEl = qs('#products');
        if (!productsEl) return;

        const searchEl = qs('#search');
        const sortEl = qs('#sort');
        const categoryEl = qs('#categoryFilter');
        const priceMinEl = qs('#priceMin');
        const priceMaxEl = qs('#priceMax');
        const applyBtn = qs('#applyFilters');
        const clearBtn = qs('#clearFilters');
        const prevBtn = qs('#prevPage');
        const nextBtn = qs('#nextPage');
        const pageInfo = qs('#pageInfo');

        const PER_PAGE = 6;
        let currentPage = 1;

        function formatPrice(n) {
            try { return n.toLocaleString('ru-RU') + ' ₽'; } catch (e) { return n + ' ₽'; }
        }

        function getFilters() {
            const query = (searchEl && searchEl.value || '').trim().toLowerCase();
            const category = categoryEl && categoryEl.value || '';
            const min = priceMinEl ? parseFloat(priceMinEl.value) : NaN;


            const max = priceMaxEl ? parseFloat(priceMaxEl.value) : NaN;
            return { query, category, min: isNaN(min) ? 0 : min, max: isNaN(max) ? Infinity : max };
        }

        function applySort(list) {
            const sort = sortEl ? sortEl.value : 'default';
            if (sort === 'price-asc') return list.slice().sort((a, b) => a.price - b.price);
            if (sort === 'price-desc') return list.slice().sort((a, b) => b.price - a.price);
            if (sort === 'popular') return list.slice().reverse();
            return list;
        }

        function filterList() {
            const f = getFilters();
            return products.filter(p => {
                if (f.category && p.category !== f.category) return false;
                if (p.price < f.min) return false;
                if (p.price > f.max) return false;
                if (f.query && !p.title.toLowerCase().includes(f.query)) return false;
                return true;
            });
        }

        function renderList() {
            let list = filterList();
            list = applySort(list);

            const totalPages = Math.max(1, Math.ceil(list.length / PER_PAGE));
            if (currentPage > totalPages) currentPage = totalPages;
            const start = (currentPage - 1) * PER_PAGE;
            const pageItems = list.slice(start, start + PER_PAGE);

            productsEl.innerHTML = '';

            if (pageItems.length === 0) {
                const p = document.createElement('p');
                p.className = 'small text-muted';
                p.textContent = 'Товары не найдены.';
                productsEl.appendChild(p);
            } else {
                pageItems.forEach(pData => {
                    const card = document.createElement('article');
                    card.className = 'product-card';
                    card.innerHTML = ''
                        + '<div class="product-img" aria-hidden="true">Изображение</div>'
                        + `<h3>${escapeHtml(pData.title)}</h3>`
                        + `<p class="price">${formatPrice(pData.price)}</p>`
                        + '<div class="product-actions">'
                        + `  <button class="button secondary-btn" data-action="details" data-id="${pData.id}">Подробнее</button>`
                        + `  <button class="button buy-btn" data-action="add" data-id="${pData.id}">В корзину</button>`
                        + '</div>';
                    productsEl.appendChild(card);
                });
            }

            if (pageInfo) pageInfo.textContent = 'Страница ' + currentPage + ' / ' + totalPages;
            if (prevBtn) prevBtn.disabled = currentPage <= 1;
            if (nextBtn) nextBtn.disabled = currentPage >= totalPages;
        }
        if (applyBtn) applyBtn.addEventListener('click', function () { currentPage = 1; renderList(); });
        if (clearBtn) clearBtn.addEventListener('click', function () {
            if (searchEl) searchEl.value = '';
            if (sortEl) sortEl.value = 'default';
            if (categoryEl) categoryEl.value = '';
            if (priceMinEl) priceMinEl.value = '';
            if (priceMaxEl) priceMaxEl.value = '';
            currentPage = 1;
            renderList();
        });
        if (prevBtn) prevBtn.addEventListener('click', function () { if (currentPage > 1) { currentPage--; renderList(); } });
        if (nextBtn) nextBtn.addEventListener('click', function () { currentPage++; renderList(); });

        on(productsEl, 'click', 'button', function (e) {
            const action = this.getAttribute('data-action');
            const id = this.getAttribute('data-id');
            if (!action) return;
            if (action === 'add') {
                showToast('Товар добавлен в корзину');
            } else if (action === 'details') {
                showToast('Открыть страницу товара: ' + id);
            }
        });

        if (searchEl) searchEl.addEventListener('keydown', function (e) { if (e.key === 'Enter') { currentPage = 1; renderList(); } });

        function escapeHtml(s) {
            return String(s).replace(/[&<>"']/g, function (m) {
                return ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[m];
            });
        }

        renderList();

    })();

    /* CONTACTS */
    (function initContacts() {
        const contactForm = qs('#contactForm');
        if (!contactForm) return;

        const nameEl = qs('#c-name');
        const emailEl = qs('#c-email');

        const messageEl = qs('#c-message');
        const submitBtn = contactForm.querySelector('button[type="submit"]');

        function showFieldError(field, msg) {
            let err = field.parentElement && field.parentElement.querySelector('.field-error');
            if (!err) {
                err = document.createElement('div');
                err.className = 'field-error small text-danger';
                field.parentElement.appendChild(err);
            }
            err.textContent = msg;
            field.classList.add('invalid');
        }
        function clearFieldError(field) {
            if (!field) return;
            const err = field.parentElement && field.parentElement.querySelector('.field-error');
            if (err) err.remove();
            field.classList.remove('invalid');
        }

        function validateEmail(email) {
            return /^\S+@\S+\.\S+$/.test(email);
        }

        function validateForm() {
            let ok = true;
            [nameEl, emailEl, messageEl].forEach(clearFieldError);

            if (!nameEl || !nameEl.value.trim()) {
                showFieldError(nameEl, 'Введите имя');
                ok = false;
            }
            if (!emailEl || !emailEl.value.trim()) {
                showFieldError(emailEl, 'Введите email');
                ok = false;
            } else if (!validateEmail(emailEl.value.trim())) {
                showFieldError(emailEl, 'Неверный формат email');
                ok = false;
            }
            if (!messageEl || !messageEl.value.trim()) {
                showFieldError(messageEl, 'Введите сообщение');
                ok = false;
            }

            return ok;
        }

        function updateSubmitState() {
            if (!submitBtn) return;
            const ok = (nameEl && nameEl.value.trim()) && (emailEl && emailEl.value.trim()) && (messageEl && messageEl.value.trim());
            submitBtn.disabled = !ok;
        }

        [nameEl, emailEl, messageEl].forEach(function (el) {
            if (!el) return;
            el.addEventListener('input', function () {
                clearFieldError(el);
                updateSubmitState();
            });
            el.addEventListener('blur', function () {
                if (el === emailEl && el.value.trim() && !validateEmail(el.value.trim())) {
                    showFieldError(emailEl, 'Неверный формат email');
                }
            });
        });

        updateSubmitState();

        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();
            if (!validateForm()) {
                showToast('Пожалуйста, исправьте ошибки в форме');
                return;
            }

            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.textContent = 'Отправка...';
            }

            const payload = {
                name: nameEl.value.trim(),
                email: emailEl.value.trim(),
                message: messageEl.value.trim()
            };

            setTimeout(function () {
                showToast('Сообщение отправлено. Спасибо!');
                contactForm.reset();
                updateSubmitState();
                [nameEl, emailEl, messageEl].forEach(clearFieldError);
                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.textContent = 'Отправить';
                }
            }, 700);
        });
    })();

    on(document, 'click', '[data-href]', function (e) {
        const href = this.getAttribute('data-href');
        if (href) window.location.href = href;
    });

})();

