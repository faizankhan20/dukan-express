// SLIDESHOW
let c=0,n=4,tm;
const sl=document.querySelectorAll('.slide'),de=document.getElementById('dts');
sl.forEach((_,i)=>{const d=document.createElement('button');d.className='dot'+(i===0?' on':'');d.onclick=()=>go(i);de.appendChild(d);});
function go(x){sl[c].classList.remove('active');de.children[c].classList.remove('on');c=x;sl[c].classList.add('active');de.children[c].classList.add('on');}
function nx(){go((c+1)%n);}
tm=setInterval(nx,4500);
document.querySelector('.hero').addEventListener('touchstart',()=>clearInterval(tm),{passive:true});

// LANGUAGE
let ur=false;
const T={
  en:{bt:'Now Delivering in Kotri',h1:'Your Local <span class="r">Dukan</span><br>at Your Door',ut:'گھر بیٹھے آرڈر کریں',lt:'Kotri, Sindh, Pakistan',dt:'Install Now',wt:'Open Web App',tp:'<strong>First time?</strong> Tap Install Now — app installs automatically. One tap!',fl:'Why Dukan Express',ftt:'Everything you need',f1h:'Easy Orders',f1p:'Browse categories, add to cart',f2h:'Rush Delivery',f2p:'Priority when you need it fast',f3h:'Live Chat',f3p:'Talk to us directly',f4h:'Track Orders',f4p:'Know where your order is',hl:'Simple Steps',htt:'How it works',s1h:'Download the app',s1p:'Install on your Android phone.',s2h:'Sign up',s2p:'Number and address — 30 seconds.',s3h:'Browse & add to cart',s3p:'Groceries, soaps and more.',s4h:'Place your order',s4p:'We deliver to your door in Kotri.',ch:'Ready to order?',cu:'ابھی آرڈر کریں — کوٹری میں ڈلیوری',cd:'Install App',cw:'Open Web App',pb:'Install Dukan Express',ps:'Add to home screen — free'},
  ur:{bt:'کوٹری میں ڈلیوری شروع ہے',h1:'<span class="r">دکان ایکسپریس</span><br>گھر کی دہلیز پر',ut:'گھر بیٹھے آرڈر کریں',lt:'کوٹری، سندھ، پاکستان',dt:'ابھی انسٹال کریں',wt:'ویب ایپ کھولیں',tp:'<strong>پہلی بار؟</strong> انسٹال ناؤ پر ٹیپ کریں — ایپ خودبخود انسٹال ہوگی',fl:'دکان ایکسپریس کیوں؟',ftt:'سب کچھ یہاں ملے گا',f1h:'آسان آرڈر',f1p:'کیٹگری سے چنیں، کارٹ میں ڈالیں',f2h:'جلدی ڈلیوری',f2p:'Rush آپشن سے فوری ڈلیوری',f3h:'لائیو چیٹ',f3p:'ایپ میں سیدھا بات کریں',f4h:'آرڈر ٹریک',f4p:'آرڈر کہاں ہے فوراً جانیں',hl:'آسان طریقہ',htt:'آرڈر کیسے کریں',s1h:'ایپ ڈاؤنلوڈ کریں',s1p:'ڈاؤنلوڈ بٹن دبائیں اور انسٹال کریں',s2h:'رجسٹر کریں',s2p:'نمبر اور پتہ درج کریں',s3h:'سامان چنیں',s3p:'گروسری، صابن، گھریلو سامان',s4h:'آرڈر کریں',s4p:'کوٹری میں گھر تک ڈلیوری',ch:'ابھی آرڈر کریں',cu:'کوٹری کی اپنی دکان',cd:'ایپ انسٹال کریں',cw:'ویب ایپ',pb:'دکان ایکسپریس انسٹال کریں',ps:'ہوم اسکرین پر شامل کریں'}
};
function tgl(){
  ur=!ur;const L=ur?T.ur:T.en;
  ['bt','ut','lt','dt','wt','fl','ftt','f1h','f1p','f2h','f2p','f3h','f3p','f4h','f4p','hl','htt','s1h','s1p','s2h','s2p','s3h','s3p','s4h','s4p','ch','cu','cd','cw','pb','ps'].forEach(id=>{
    const el=document.getElementById(id);if(el)el.textContent=L[id];
  });
  document.getElementById('h1').innerHTML=L.h1;
  document.getElementById('tp').innerHTML=L.tp;
  document.getElementById('lb').textContent=ur?'EN / اردو':'اردو / EN';
  document.documentElement.setAttribute('dir',ur?'rtl':'ltr');
}

// WHATSAPP
(function(){
  const p=[92,303,309,2583].join('');
  const m=encodeURIComponent('السلام علیکم! Dukan Express Kotri سے آرڈر کرنا ہے۔');
  document.getElementById('wa').href='https://wa.me/'+p+'?text='+m;
})();

// PWA INSTALL
let deferredPrompt = null;
const isIOS = /iphone|ipad|ipod/i.test(navigator.userAgent) && !window.MSStream;
const isStandalone = window.matchMedia('(display-mode: standalone)').matches || navigator.standalone;

window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;
  if (!sessionStorage.getItem('pwa-d') && !isStandalone) {
    setTimeout(() => document.getElementById('pwa-banner').classList.add('show'), 2500);
  }
  autoInstallForAds();
});

function autoInstallForAds() {
  const params = new URLSearchParams(window.location.search);
  const isFromAd = params.get('fbclid') || params.get('utm_source') === 'facebook' || params.get('utm_medium') === 'cpc' || params.get('ref') === 'ad';
  if (isFromAd && deferredPrompt && !isStandalone && !sessionStorage.getItem('auto-installed')) {
    sessionStorage.setItem('auto-installed', '1');
    setTimeout(() => installWebApp(), 1500);
  }
}

async function installWebApp() {
  if (isStandalone) { window.location.href = 'https://dukan-express.netlify.app/'; return; }
  if (isIOS) { document.getElementById('ios-m').classList.add('show'); return; }
  if (deferredPrompt) {
    try {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        document.getElementById('pwa-banner').classList.remove('show');
        sessionStorage.setItem('pwa-d', '1');
        document.querySelectorAll('.bdl, .bw').forEach(btn => {
          btn.innerHTML = '✅ Open App';
          btn.onclick = (e) => { e.preventDefault(); window.location.href = 'https://dukan-express.netlify.app/'; };
        });
        setTimeout(() => { window.location.href = 'https://dukan-express.netlify.app/'; }, 1000);
      }
      deferredPrompt = null;
    } catch (err) {}
  }
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelector('.bdl')?.addEventListener('click', (e) => { e.preventDefault(); installWebApp(); });
  document.querySelector('.bw')?.addEventListener('click', (e) => { e.preventDefault(); installWebApp(); });
  document.getElementById('pi').addEventListener('click', () => installWebApp());
  if (isStandalone) {
    document.querySelectorAll('.bdl, .bw').forEach(btn => {
      btn.innerHTML = '✅ Open App';
      btn.onclick = (e) => { e.preventDefault(); window.location.href = 'https://dukan-express.netlify.app/'; };
    });
  }
});

window.addEventListener('appinstalled', () => {
  document.getElementById('pwa-banner').classList.remove('show');
  sessionStorage.setItem('pwa-d', '1');
  document.querySelectorAll('.bdl, .bw').forEach(btn => {
    btn.innerHTML = '✅ Open App';
    btn.onclick = (e) => { e.preventDefault(); window.location.href = 'https://dukan-express.netlify.app/'; };
  });
});

function dpwa() { document.getElementById('pwa-banner').classList.remove('show'); sessionStorage.setItem('pwa-d', '1'); }

if (isIOS && !isStandalone && !sessionStorage.getItem('ios-d')) {
  setTimeout(() => document.getElementById('ios-m').classList.add('show'), 3500);
}
function clos(e) {
  if (!e || e.target === document.getElementById('ios-m')) {
    document.getElementById('ios-m').classList.remove('show');
    sessionStorage.setItem('ios-d', '1');
  }
}

if ('serviceWorker' in navigator) navigator.serviceWorker.register('sw.js').catch(() => {});
