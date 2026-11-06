const menuToggle = document.querySelector('.menu-toggle');
const primaryNavigation = document.querySelector('#primary-navigation');

if (menuToggle && primaryNavigation) {
  const closeMenu = () => {
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', 'Open navigation');
    primaryNavigation.classList.remove('is-open');
  };

  menuToggle.addEventListener('click', () => {
    const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
    menuToggle.setAttribute('aria-expanded', String(!isOpen));
    menuToggle.setAttribute('aria-label', isOpen ? 'Open navigation' : 'Close navigation');
    primaryNavigation.classList.toggle('is-open', !isOpen);
  });

  primaryNavigation.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', closeMenu);
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeMenu();
  });
}

const workItems = [
  {
    kicker: 'REFLECTION · 30 AUG 2026',
    title: 'The version of you that stayed',
    quote: 'Maybe you don’t miss them… you miss the person you were with them.',
    description: 'A reflection on missing someone—and the version of yourself that existed when they were in your life.',
    source: 'https://www.instagram.com/ddktalks/p/DcsfGdbEa5o/',
    sourceLabel: 'Open original Instagram post',
    artClass: 'work-art--lavender',
  },
  {
    kicker: 'REFLECTION · 01 SEP 2026',
    title: 'The stories silence leaves behind',
    quote: 'Silence doesn’t always make you stronger. Sometimes, it makes people write their own version of your story.',
    description: 'A note about quiet, understanding, and the stories others can write when we do not get to tell our own.',
    source: 'https://www.instagram.com/ddktalks/p/DcvpqwTj8wJ/',
    sourceLabel: 'Open original Instagram post',
    artClass: 'work-art--coral',
  },
  {
    kicker: 'HUMAN CONNECTION · 30 AUG 2026',
    title: 'How people remember us',
    quote: 'People don’t always remember how you treated them. They remember how they felt about themselves when they were around you.',
    description: 'A thought on the feeling people carry with them after spending time in our company.',
    source: 'https://www.instagram.com/ddktalks/p/DcsMGT0kZho/',
    sourceLabel: 'Open original Instagram post',
    artClass: 'work-art--olive',
  },
  {
    kicker: 'REEL · 24 DEC 2025',
    title: 'A moment in motion',
    quote: 'A moment in motion.',
    description: 'A video posted by Donakonda Dileep Kumar on the DDK Talks profile on December 24, 2025.',
    source: 'https://www.instagram.com/ddktalks/reel/DSp19mnDyZv/',
    sourceLabel: 'Open original Instagram reel',
    artClass: 'work-art--night',
  },
];

const workDialog = document.querySelector('#work-dialog');
const dialogClose = document.querySelector('#dialog-close');
const dialogKicker = document.querySelector('#dialog-kicker');
const dialogDate = document.querySelector('#dialog-date');
const dialogTitle = document.querySelector('#dialog-title');
const dialogDescription = document.querySelector('#dialog-description');
const dialogSource = document.querySelector('#dialog-source');
const dialogArt = document.querySelector('#dialog-art');
const dialogArtMeta = document.querySelector('#dialog-art-meta');
const dialogArtQuote = document.querySelector('#dialog-art-quote');

function openWorkDetails(index, trigger) {
  const item = workItems[index];
  if (!item || !workDialog || typeof workDialog.showModal !== 'function') return;

  dialogKicker.textContent = item.kicker;
  dialogDate.textContent = item.kicker;
  dialogTitle.textContent = item.title;
  dialogDescription.textContent = item.description;
  dialogSource.href = item.source;
  dialogSource.innerHTML = `${item.sourceLabel} <span aria-hidden="true">↗</span>`;
  dialogArt.className = `dialog-art ${item.artClass}`;
  dialogArtMeta.textContent = item.kicker;
  dialogArtQuote.textContent = item.quote;
  workDialog.returnValue = '';
  workDialog.showModal();
  if (trigger) workDialog.dataset.lastTrigger = trigger.id || '';
}

document.querySelectorAll('[data-work]').forEach((trigger) => {
  trigger.addEventListener('click', () => {
    openWorkDetails(Number(trigger.dataset.work), trigger);
  });
});

if (dialogClose && workDialog) {
  dialogClose.addEventListener('click', () => workDialog.close());
  workDialog.addEventListener('click', (event) => {
    if (event.target === workDialog) workDialog.close();
  });
  workDialog.addEventListener('close', () => {
    const previousTrigger = document.querySelector(`[data-work][id="${workDialog.dataset.lastTrigger}"]`);
    if (previousTrigger) previousTrigger.focus();
  });
}
