const pages   = document.querySelectorAll('.page');
const navLinks = document.querySelectorAll('[data-page]');

function goTo(pageId) {
  pages.forEach(p => p.classList.remove('active'));
  navLinks.forEach(a => a.classList.remove('active'));

  const target = document.getElementById(pageId);
  if (target) target.classList.add('active');

  navLinks.forEach(a => {
    if (a.dataset.page === pageId) a.classList.add('active');
  });

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

navLinks.forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    goTo(link.dataset.page);
  });
});

(function renderContato() {
  const u = 'rafaelatech321';
  const d = 'gmail.com';
  const email = u + '@' + d;

  const ph1 = '81';
  const ph2 = '98426';
  const ph3 = '7207';
  const phone = '(' + ph1 + ') ' + ph2 + '-' + ph3;
  const phoneHref = ph1 + ph2 + ph3;

  const infoEmail = document.getElementById('info-email');
  if (infoEmail) {
    const a = document.createElement('a');
    a.href = 'mailto:' + email;
    a.textContent = email;
    infoEmail.appendChild(a);
  }

  const infoPhone = document.getElementById('info-phone');
  if (infoPhone) infoPhone.textContent = phone;

  const emailLink = document.getElementById('contato-email-link');
  const emailVal  = document.getElementById('contato-email-val');
  if (emailLink) emailLink.href = 'mailto:' + email;
  if (emailVal)  emailVal.textContent = email;

  const phoneLink = document.getElementById('contato-phone-link');
  const phoneVal  = document.getElementById('contato-phone-val');
  if (phoneLink) phoneLink.href = 'tel:' + phoneHref;
  if (phoneVal)  phoneVal.textContent = phone;
})();

const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xjgzprqp';

async function enviarMensagem() {
  const nomeEl  = document.getElementById('nome');
  const emailEl = document.getElementById('email');
  const msgEl   = document.getElementById('msg');
  const honey   = document.querySelector('input[name="_honey"]');
  const btn     = document.querySelector('#contato .btn-primary');
  const fb      = document.getElementById('form-feedback');

  const nome  = nomeEl.value.trim();
  const email = emailEl.value.trim();
  const msg   = msgEl.value.trim();

  if (honey && honey.value) return;

  if (!nome || !email || !msg) {
    mostrarFeedback('Por favor, preencha todos os campos!', 'erro');
    return;
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    mostrarFeedback('Por favor, insira um e-mail válido.', 'erro');
    return;
  }
  if (msg.length < 10) {
    mostrarFeedback('A mensagem está muito curta.', 'erro');
    return;
  }

  btn.disabled = true;
  btn.textContent = 'Enviando...';

  try {
    const resposta = await fetch(FORMSPREE_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify({ nome, email, mensagem: msg })
    });

    if (resposta.ok) {
      nomeEl.value  = '';
      emailEl.value = '';
      msgEl.value   = '';
      mostrarFeedback('✓ Mensagem enviada! Em breve entro em contato.', 'sucesso');
    } else {
      const dados = await resposta.json();
      const erros = dados.errors?.map(e => e.message).join(', ') || 'Erro desconhecido.';
      mostrarFeedback('Ops, algo deu errado: ' + erros, 'erro');
    }
  } catch (_) {
    mostrarFeedback('Sem conexão. Tente novamente ou me chame pelo LinkedIn.', 'erro');
  } finally {
    btn.disabled = false;
    btn.textContent = 'Enviar Mensagem →';
  }
}

function mostrarFeedback(texto, tipo) {
  const fb = document.getElementById('form-feedback');
  fb.textContent = texto;
  fb.style.display = 'block';
  fb.style.color = tipo === 'erro' ? '#f87171' : 'var(--lilas)';
  clearTimeout(fb._timer);
  fb._timer = setTimeout(() => fb.style.display = 'none', 6000);
}

const observer = new MutationObserver(() => {
  const bars = document.querySelectorAll('.skill-bar-fill');
  bars.forEach(b => {
    b.style.animation = 'none';
    b.offsetHeight;
    b.style.animation = '';
  });
});
const habilPage = document.getElementById('habilidades');
if (habilPage) observer.observe(habilPage, { attributeFilter: ['class'] });
