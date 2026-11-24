// ================= 1. DARK / LIGHT MODE TOGGLE =================
const themeToggle = document.getElementById('themeToggle');
const body = document.body;

if (localStorage.getItem('theme') === 'dark') {
  body.classList.add('dark-mode');
}

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    localStorage.setItem('theme', body.classList.contains('dark-mode') ? 'dark' : 'light');
  });
}

// ================= 2. MOBILE HAMBURGER MENU =================
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

if (menuToggle && navLinks) {
  menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('show');
  });
}

// ================= 3. ACTIVE LINK HIGHLIGHT =================
const navItems = document.querySelectorAll('.nav-links a');

navItems.forEach(item => {
  item.addEventListener('click', () => {
    navItems.forEach(link => link.classList.remove('active'));
    item.classList.add('active');
    if (navLinks) navLinks.classList.remove('show');
  });
});

// ================= 4. REAL-TIME MUSIC PLAYER =================
const playlist = [
  {
    title: "2:23 AM",
    artist: "しゃろう (Sharou)",
    src: "music/2_23_AM.mp3",
    cover: "images/2_23 am.jpg"
  },
  {
    title: "Summer Triangle",
    artist: "しゃろう (Sharou)",
    src: "music/SUMMER_TRIANGLE.mp3",
    cover: "images/summer triangle.jpg"
  }
];

const audioPlayer = document.getElementById('audioPlayer');
const playBtn = document.getElementById('playBtn');
const prevSongBtn = document.getElementById('prevSongBtn');
const nextSongBtn = document.getElementById('nextSongBtn');
const songTitle = document.getElementById('songTitle');
const songArtist = document.getElementById('songArtist');
const songCover = document.getElementById('songCover');
const albumArt = document.getElementById('albumArt');
const songProgressBar = document.getElementById('songProgressBar');
const songProgressFill = document.getElementById('songProgressFill');
const currentTimeEl = document.getElementById('currentTime');
const totalDurationEl = document.getElementById('totalDuration');

let songIndex = 0;
let isPlaying = false;

function loadSong(index) {
  const song = playlist[index];
  if (!song) return;
  if (songTitle) songTitle.textContent = song.title;
  if (songArtist) songArtist.textContent = song.artist;
  if (audioPlayer) audioPlayer.src = song.src;
  if (songCover && song.cover) {
    songCover.style.display = 'block';
    songCover.src = song.cover;
  }
  if (songProgressFill) songProgressFill.style.width = '0%';
  if (currentTimeEl) currentTimeEl.textContent = '0:00';
  if (totalDurationEl) totalDurationEl.textContent = '0:00';
}

function playSong() {
  if (!audioPlayer) return;
  audioPlayer.play().then(() => {
    isPlaying = true;
    if (playBtn) playBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
    if (albumArt) albumArt.classList.add('playing');
  }).catch(() => {
    alert('File lagu tidak ditemukan! Pastikan file .mp3 ada di folder music/ dan namanya sesuai di script.js.');
  });
}

function pauseSong() {
  if (!audioPlayer) return;
  isPlaying = false;
  audioPlayer.pause();
  if (playBtn) playBtn.innerHTML = '<i class="fa-solid fa-play"></i>';
  if (albumArt) albumArt.classList.remove('playing');
}

function formatTime(sec) {
  if (isNaN(sec)) return '0:00';
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${m}:${s < 10 ? '0' : ''}${s}`;
}

if (playBtn) {
  playBtn.addEventListener('click', () => {
    isPlaying ? pauseSong() : playSong();
  });
}

if (prevSongBtn) {
  prevSongBtn.addEventListener('click', () => {
    songIndex = (songIndex - 1 + playlist.length) % playlist.length;
    loadSong(songIndex);
    playSong();
  });
}

if (nextSongBtn) {
  nextSongBtn.addEventListener('click', () => {
    songIndex = (songIndex + 1) % playlist.length;
    loadSong(songIndex);
    playSong();
  });
}

if (audioPlayer) {
  audioPlayer.addEventListener('loadedmetadata', () => {
    if (totalDurationEl) totalDurationEl.textContent = formatTime(audioPlayer.duration);
  });

  audioPlayer.addEventListener('timeupdate', () => {
    if (audioPlayer.duration) {
      const percent = (audioPlayer.currentTime / audioPlayer.duration) * 100;
      if (songProgressFill) songProgressFill.style.width = `${percent}%`;
      if (currentTimeEl) currentTimeEl.textContent = formatTime(audioPlayer.currentTime);
      if (totalDurationEl) totalDurationEl.textContent = formatTime(audioPlayer.duration);
    }
  });

  audioPlayer.addEventListener('ended', () => {
    songIndex = (songIndex + 1) % playlist.length;
    loadSong(songIndex);
    playSong();
  });
}

if (songProgressBar && audioPlayer) {
  songProgressBar.addEventListener('click', (e) => {
    const width = songProgressBar.clientWidth;
    const clickX = e.offsetX;
    if (audioPlayer.duration) {
      audioPlayer.currentTime = (clickX / width) * audioPlayer.duration;
    }
  });
}

loadSong(songIndex);

// ================= 5. MULTI-LANGUAGE (EN, ID, CH, JP) =================
const verticalScrollUpdaters = [];

const translations = {
  en: {
    nav_home: "Home",
    nav_about: "About",
    nav_skills: "Skills",
    nav_projects: "Projects",
    nav_achievements: "Achievements",
    nav_experiences: "Experiences",
    nav_contact: "Contact",
    nav_guestbook: "Guestbook",
    notif_title: "Notifications",
    notif_mark_read: "Mark as read",
    notif_empty: "No new notifications",
    notif_left_msg: "left a message in Guestbook",
    guest_title: "Visitor Notes",
    guest_compose_title: "Leave a Note ✨",
    guest_sub: "Share a thought, feedback, or just say hello!",
    btn_post_note: "Post Note",
    bd_title: "Birthday",
    personality_title: "Personality",
    hobby_title: "Interests",
    active_title: "Active",
    active_sub: "Online",
    years_active: "Years Active",
    present_text: "- Present",
    role_title: "Role",
    loc_title: "Base",
    today_title: "Today",
    day_hanzi_title: "Day",
    tz_title: "Local Time",
    hero_welcome: "Welcome to my space ✨",
    hero_hi: "Hi, I'm",
    hero_role: "Student at Institut Teknologi Del",
    hero_desc: "A student at Institut Teknologi Del who is passionate about learning web development, UI/UX design, and turning creative ideas into real projects.",
    btn_cv: "View CV",
    btn_projects: "View Projects",
    btn_contact: "Contact Me",
    about_title: "About Me",
    about_text: "I'm a student at Institut Teknologi Del with a deep interest in languages and linguistics. Currently, I'm learning Mandarin, Japanese, and English. I truly enjoy peaceful moments, quiet atmospheres, and expressing creativity through clean, aesthetic designs.",
    tag_1: "#Linguistics",
    tag_2: "#EN·CN·JP",
    tag_3: "#Peaceful",
    tag_4: "#Lofi & Anime",
    skills_title: "Skills & Tech",
    projects_title: "Featured Projects",
    cat_web: "Website",
    cat_app: "Application",
    cat_data: "Analysis",
    proj1_title: "Campus Cafe Ordering Web",
    proj1_desc: "A web-based food and beverage ordering platform featuring menu management, shopping cart, and transaction reports.",
    proj2_title: "Language Flashcard App",
    proj2_desc: "A mobile app to help learn Mandarin, Japanese, and English vocabulary using spaced repetition and audio.",
    proj3_title: "Student Grade & Data Visualization",
    proj3_desc: "Academic performance data analysis and interactive visualization using Python to map student grade trends.",
    proj4_title: "Personal Bento Portfolio",
    proj4_desc: "An interactive Bento UI portfolio website featuring Dark Mode, Multi-language (EN, ID, CH, JP), and a real-time music player.",
    btn_view: "View",
    btn_code: "Code",
    ach_title: "Achievements",
    click_preview: "Preview",
    pdf_cert: "PDF Certificate",
    btn_open_pdf: "Open Full Document",
    no_photo: "No activity photo yet",
    ach1_issuer: "Oracle University",
    ach1_title: "Oracle Cloud Infrastructure Certified Architect Associate",
    ach1_date: "November 2026",
    ach2_issuer: "Oracle University",
    ach2_title: "Oracle Data Center Operations Certified Foundations Associate",
    ach2_date: "November 2026",
    ach3_issuer: "Del Debate Competition Committee",
    ach3_title: "Consumption Committee of Del Debate Competition 2025",
    ach3_date: "April 2025",
    ach4_issuer: "Del Debate Competition Committee",
    ach4_title: "Member of the Event Division of Del Debate Championship 2026",
    ach4_date: "May 2026",
    ach5_issuer: "Student's Council of Institut Teknologi Del",
    ach5_title: "Member of the Order Division 2025",
    ach5_date: "July 2026",
    ach6_issuer: "Del English Club",
    ach6_title: "Member of the English Club 2025",
    ach6_date: "April 2025",
    exp_title: "Experiences",
    btn_photo: "View Photo",
    exp1_date: "2025 - Present",
    exp1_title: "Campus Organization / Committee",
    exp1_org: "Institut Teknologi Del",
    exp1_desc: "Actively participating in student activities and campus events while building teamwork, communication, and leadership skills.",
    exp2_date: "2024 - 2025",
    exp2_title: "Academic Web & App Projects",
    exp2_org: "IT Del Coursework",
    exp2_desc: "Designed and built various coursework projects ranging from UI/UX wireframes in Figma to web and mobile implementation with teams.",
    exp3_date: "2024 - Present",
    exp3_title: "Independent Language & Tech Learner",
    exp3_org: "Self-Study (EN, CN, JP)",
    exp3_desc: "Exploring linguistics and self-studying three languages (English, Mandarin, Japanese) while sharpening web interface design skills.",
    contact_title: "Get In Touch",
    collab_title: "Let's Connect!",
    collab_desc: "Open for web projects, UI/UX discussions, or chatting about languages (EN, CN, JP). Feel free to drop a message anytime!",
    collab_loc: "IT Del, North Sumatra, Indonesia",
    ph_name: "Name",
    ph_email: "Email",
    ph_phone: "Phone",
    ph_msg: "Message",
    btn_send: "Send",
    footer_desc: "Thank you for visiting my personal portfolio website. Connect with me over socials.",
    footer_links: "Quick Links",
    footer_contact: "Contact Info"
  },
  id: {
    nav_home: "Beranda",
    nav_about: "Tentang",
    nav_skills: "Keahlian",
    nav_projects: "Proyek",
    nav_achievements: "Prestasi",
    nav_experiences: "Pengalaman",
    nav_contact: "Kontak",
    nav_guestbook: "Ruang Obrolan",
    notif_title: "Notifikasi",
    notif_mark_read: "Tandai dibaca",
    notif_empty: "Belum ada notifikasi baru",
    notif_left_msg: "mengirim pesan di Ruang Obrolan",
    guest_title: "Catatan Pengunjung",
    guest_compose_title: "Tulis Catatan ✨",
    guest_sub: "Bagikan kesan, saran, atau sekadar menyapa!",
    btn_post_note: "Kirim Catatan",
    bd_title: "Ulang Tahun",
    personality_title: "Kepribadian",
    hobby_title: "Minat",
    active_title: "Aktif",
    active_sub: "Online",
    years_active: "Tahun Aktif",
    present_text: "- Sekarang",
    role_title: "Peran",
    loc_title: "Lokasi",
    today_title: "Hari Ini",
    day_hanzi_title: "Hari",
    tz_title: "Waktu Lokal",
    hero_welcome: "Selamat Datang ✨",
    hero_hi: "Halo, Namaku",
    hero_role: "Mahasiswa Institut Teknologi Del",
    hero_desc: "Mahasiswa di Institut Teknologi Del yang antusias belajar pengembangan web, desain UI/UX, serta mewujudkan ide kreatif menjadi karya nyata.",
    btn_cv: "Lihat CV",
    btn_projects: "Lihat Proyek",
    btn_contact: "Hubungi Saya",
    about_title: "Tentang Saya",
    about_text: "Saya adalah mahasiswa Institut Teknologi Del yang memiliki ketertarikan besar di bidang bahasa dan linguistik. Saat ini saya sedang belajar tiga bahasa, yaitu Mandarin, Jepang, dan Inggris. Saya sangat menyukai ketenangan, suasana yang damai, serta menuangkan kreativitas lewat desain yang rapi dan estetik.",
    tag_1: "#Linguistik",
    tag_2: "#EN·CN·JP",
    tag_3: "#Ketenangan",
    tag_4: "#Lofi & Anime",
    skills_title: "Keahlian & Teknologi",
    projects_title: "Proyek Unggulan",
    cat_web: "Website",
    cat_app: "Aplikasi",
    cat_data: "Analisis",
    proj1_title: "Web Pemesanan Kafe Kampus",
    proj1_desc: "Platform pemesanan makanan dan minuman berbasis web dengan fitur manajemen menu, keranjang belanja, dan laporan transaksi.",
    proj2_title: "Aplikasi Flashcard Bahasa",
    proj2_desc: "Aplikasi mobile untuk membantu belajar kosakata Mandarin, Jepang, dan Inggris menggunakan metode spaced repetition dan audio.",
    proj3_title: "Analisis & Visualisasi Nilai Mahasiswa",
    proj3_desc: "Analisis data performa akademik dan visualisasi interaktif menggunakan Python untuk memetakan tren nilai mahasiswa.",
    proj4_title: "Portofolio Bento Interaktif",
    proj4_desc: "Website portofolio interaktif bergaya Bento UI dengan fitur Dark Mode, Multi-bahasa (EN, ID, CH, JP), dan pemutar musik real-time.",
    btn_view: "Lihat",
    btn_code: "Kode",
    ach_title: "Prestasi",
    click_preview: "Pratinjau",
    pdf_cert: "Sertifikat PDF",
    btn_open_pdf: "Buka Dokumen Penuh",
    no_photo: "Belum ada foto kegiatan",
    ach1_issuer: "Oracle University",
    ach1_title: "Oracle Cloud Infrastructure Certified Architect Associate",
    ach1_date: "November 2026",
    ach2_issuer: "Oracle University",
    ach2_title: "Oracle Data Center Operations Certified Foundations Associate",
    ach2_date: "November 2026",
    ach3_issuer: "Del Debate Competition Committee",
    ach3_title: "Panitia Konsumsi Del Debate Competition 2025",
    ach3_date: "April 2025",
    ach4_issuer: "Del Debate Competition Committee",
    ach4_title: "Anggota Divisi Acara Del Debate Championship 2026",
    ach4_date: "Mei 2026",
    ach5_issuer: "Badan Eksekutif Mahasiswa Institut Teknologi Del",
    ach5_title: "Anggota Departemen Ketertiban & Kedisiplinan 2025",
    ach5_date: "Juli 2026",
    ach6_issuer: "Del English Club",
    ach6_title: "Anggota Del English Club 2025",
    ach6_date: "April 2025",
    exp_title: "Pengalaman",
    btn_photo: "Lihat Foto",
    exp1_date: "2025 - Sekarang",
    exp1_title: "Organisasi & Kepanitiaan Kampus",
    exp1_org: "Institut Teknologi Del",
    exp1_desc: "Aktif berpartisipasi dalam kegiatan kemahasiswaan, kerja tim, serta melatih kemampuan komunikasi dan kepemimpinan di lingkungan kampus.",
    exp2_date: "2024 - 2025",
    exp2_title: "Proyek Akademik Web & Aplikasi",
    exp2_org: "Tugas Kuliah IT Del",
    exp2_desc: "Merancang dan membangun berbagai proyek tugas kuliah mulai dari desain UI/UX di Figma hingga implementasi web dan mobile bersama tim.",
    exp3_date: "2024 - Sekarang",
    exp3_title: "Pembelajar Mandiri Bahasa & Teknologi",
    exp3_org: "Belajar Mandiri (EN, CN, JP)",
    exp3_desc: "Mendalami ilmu linguistik dan belajar mandiri tiga bahasa (Inggris, Mandarin, Jepang) sambil mengasah keterampilan desain antarmuka web.",
    contact_title: "Hubungi Saya",
    collab_title: "Mari Terhubung!",
    collab_desc: "Terbuka untuk diskusi proyek web, desain UI/UX, atau bertukar cerita seputar belajar bahasa (EN, CN, JP). Silakan kirim pesan kapan saja!",
    collab_loc: "IT Del, Sumatera Utara, Indonesia",
    ph_name: "Nama",
    ph_email: "Email",
    ph_phone: "Telepon",
    ph_msg: "Pesan",
    btn_send: "Kirim",
    footer_desc: "Terima kasih telah mengunjungi situs portofolio saya. Mari terhubung di media sosial.",
    footer_links: "Tautan Cepat",
    footer_contact: "Info Kontak"
  },
  ch: {
    nav_home: "首页",
    nav_about: "关于",
    nav_skills: "技能",
    nav_projects: "项目",
    nav_achievements: "成就",
    nav_experiences: "经验",
    nav_contact: "联系",
    notif_title: "消息通知",
    notif_mark_read: "全部已读",
    notif_empty: "暂无新通知",
    notif_left_msg: "在留言板发来了新消息",
    bd_title: "生日",
    nav_guestbook: "留言板",
    guest_title: "访客留言墙",
    guest_compose_title: "写下留言 ✨",
    guest_sub: "欢迎留下你的想法、建议或打个招呼！",
    btn_post_note: "发布留言",
    personality_title: "性格",
    hobby_title: "兴趣",
    active_title: "状态",
    active_sub: "在线",
    years_active: "活跃年份",
    present_text: "- 至今",
    role_title: "职位",
    loc_title: "地点",
    today_title: "今天",
    day_hanzi_title: "星期",
    tz_title: "当地时间",
    hero_welcome: "欢迎光临 ✨",
    hero_hi: "你好，我叫",
    hero_role: "德尔理工学院学生 (IT Del)",
    hero_desc: "目前就读于德尔理工学院（IT Del）。热衷于学习网页开发与UI设计，喜欢把创意变成实际的小作品。",
    btn_cv: "查看简历",
    btn_projects: "查看项目",
    btn_contact: "联系我",
    about_title: "关于我",
    about_text: "我是德尔理工学院的学生，对语言和语言学有着浓厚的兴趣。目前正在学习中文、日语和英语这三门语言。我非常喜欢安静平和的氛围，也喜欢通过简约美观的设计来表达自己的想法。",
    tag_1: "#语言学",
    tag_2: "#中·日·英",
    tag_3: "#喜欢安静",
    tag_4: "#音乐与动漫",
    skills_title: "技术栈",
    projects_title: "精选项目",
    cat_web: "网站",
    cat_app: "应用",
    cat_data: "数据分析",
    proj1_title: "校园咖啡厅点餐网站",
    proj1_desc: "基于网页的餐饮点单平台，具备菜单管理、购物车以及交易报表功能。",
    proj2_title: "多语种闪卡学习应用",
    proj2_desc: "帮助学习中文、日语和英语词汇的移动应用，结合间隔重复记忆法与语音朗读功能。",
    proj3_title: "学生成绩数据分析与可视化",
    proj3_desc: "使用 Python 进行学业表现数据分析与交互式可视化，直观展示学生成绩趋势。",
    proj4_title: "个人 Bento 风格作品集",
    proj4_desc: "交互式 Bento UI 个人作品集网站，支持深色模式、四国语言切换（EN/ID/CH/JP）及实时音乐播放器。",
    btn_view: "查看",
    btn_code: "源码",
    ach_title: "成就",
    click_preview: "预览",
    pdf_cert: "PDF 证书",
    btn_open_pdf: "打开完整文档",
    no_photo: "暂无活动照片",
    ach1_title: "Oracle 云基础设施认证架构师 (OCI Associate)",
    ach1_date: "2026年11月",
    ach2_title: "Oracle 数据中心运营基础认证",
    ach2_date: "2026年11月",
    ach3_title: "2025年 Del 辩论赛后勤组委会",
    ach3_date: "2025年4月",
    ach4_title: "2026年 Del 辩论赛活动组成员",
    ach4_date: "2026年4月",
    ach5_issuer: "Del理工学院学生会",
    ach5_title: "纪律与秩序部门成员 2025",
    ach5_date: "July 2026",
    ach6_issuer: "Del English Club",
    exp_title: "经验",
    btn_photo: "查看照片",
    exp1_date: "2025年 - 至今",
    exp1_title: "校园组织与活动策划",
    exp1_org: "德尔理工学院 (IT Del)",
    exp1_desc: "积极参与校园社团与学生活动，锻炼团队协作、沟通表达以及组织领导能力。",
    exp2_date: "2024年 - 2025年",
    exp2_title: "校内网页与应用开发项目",
    exp2_org: "IT Del 课程项目",
    exp2_desc: "与团队合作完成多个课程实践项目，涵盖从 Figma 界面设计到网页及移动应用实现。",
    exp3_date: "2024年 - 至今",
    exp3_title: "语言学与前端设计自学者",
    exp3_org: "自主学习 (英 / 中 / 日)",
    exp3_desc: "深入探索语言学知识并自学英语、中文、日语三门语言，同时不断提升网页界面设计能力。",
    contact_title: "联系我",
    collab_title: "期待与你交流！",
    collab_desc: "欢迎交流网页项目、UI/UX 设计，或者一起探讨中文、日语和英语学习。随时给我发消息吧！",
    collab_loc: "印度尼西亚 德尔理工学院 (IT Del)",
    ph_name: "姓名",
    ph_email: "邮箱",
    ph_phone: "电话",
    ph_msg: "留言内容",
    btn_send: "发送",
    footer_desc: "感谢访问我的个人作品集网站，欢迎通过社交媒体与我联系。",
    footer_links: "快速链接",
    footer_contact: "联系方式"
  },
  jp: {
    nav_home: "ホーム",
    nav_about: "私について",
    nav_skills: "スキル",
    nav_projects: "プロジェクト",
    nav_achievements: "実績",
    nav_experiences: "経歴",
    nav_contact: "お問い合わせ",
    nav_guestbook: "メッセージ",
    notif_title: "通知",
    notif_mark_read: "既読にする",
    notif_empty: "新しい通知はありません",
    notif_left_msg: "がメッセージを投稿しました",
    guest_title: "ビジターノート",
    guest_compose_title: "メッセージを残す ✨",
    guest_sub: "感想やアドバイス、ちょっとした挨拶も大歓迎です！",
    btn_post_note: "投稿する",
    bd_title: "誕生日",
    personality_title: "性格",
    hobby_title: "趣味",
    active_title: "アクティブ",
    active_sub: "オンライン",
    years_active: "活動年",
    present_text: "- 現在",
    role_title: "役割",
    loc_title: "拠点",
    today_title: "今日",
    day_hanzi_title: "曜日",
    tz_title: "現地時間",
    hero_welcome: "ようこそ ✨",
    hero_hi: "こんにちは、",
    hero_role: "デル工科大学 学生 (IT Del)",
    hero_desc: "デル工科大学（IT Del）の学生です。Web開発やUIデザインを学びながら、アイデアを形にすることを楽しんでいます。",
    btn_cv: "履歴書を見る",
    btn_projects: "作品を見る",
    btn_contact: "連絡する",
    about_title: "自己紹介",
    about_text: "デル工科大学の学生で、言語と言語学に強い興味を持っています。現在は中国語、日本語、英語の3つの言語を勉強中です。静かで落ち着いた時間を過ごすことが好きで、シンプルで美しいデザインを作ることも楽しんでいます。",
    tag_1: "#言語学",
    tag_2: "#英·中·日",
    tag_3: "#静かな時間",
    tag_4: "#音楽とアニメ",
    skills_title: "スキル・技術",
    projects_title: "主なプロジェクト",
    cat_web: "Webサイト",
    cat_app: "アプリ",
    cat_data: "データ分析",
    proj1_title: "キャンパスカフェ注文サイト",
    proj1_desc: "メニュー管理、ショッピングカート、取引レポート機能を備えたWebベースのフード＆ドリンク注文プラットフォームです。",
    proj2_title: "語学フラッシュカードアプリ",
    proj2_desc: "間隔反復学習と音声機能を活用し、中国語・日本語・英語の単語学習をサポートするモバイルアプリです。",
    proj3_title: "成績データ分析＆可視化",
    proj3_desc: "Pythonを用いて学業成績データの分析とインタラクティブな可視化を行い、成績の推移を分析するプロジェクトです。",
    proj4_title: "Bento風ポートフォリオサイト",
    proj4_desc: "ダークモード、4ヶ国語対応（EN・ID・CH・JP）、リアルタイム音楽プレイヤーを備えたBento UIのポートフォリオサイトです。",
    btn_view: "見る",
    btn_code: "コード",
    ach_title: "実績",
    click_preview: "プレビュー",
    pdf_cert: "PDF 証明書",
    btn_open_pdf: "ドキュメントを開く",
    no_photo: "活動写真はまだありません",
    ach1_title: "Oracle Cloud Infrastructure 認定アーキテクト",
    ach1_date: "2026年11月",
    ach2_title: "Oracle データセンター運用基礎認定",
    ach2_date: "2026年11月",
    ach3_title: "Delディベート大会2025 運営委員",
    ach3_date: "2025年4月",
    ach4_title: "Delディベート大会2026 イベント部門メンバー",
    ach4_date: "2026年4月",
    ach5_issuer: "Del科大学 学生会",
    ach5_title: "2025年度 規​​律・風紀担当メンバー",
    ach5_date: "July 2026",
    exp_title: "経歴",
    btn_photo: "写真を見る",
    exp1_date: "2025年 - 現在",
    exp1_title: "学内団体・イベント運営",
    exp1_org: "デル工科大学 (IT Del)",
    exp1_desc: "学内の学生団体やイベント運営に積極的に参加し、チームワークやコミュニケーション力、リーダーシップを培っています。",
    exp2_date: "2024年 - 2025年",
    exp2_title: "学内Web・アプリ開発課題",
    exp2_org: "IT Del 授業プロジェクト",
    exp2_desc: "FigmaでのUI/UXデザインからWeb・モバイルアプリの実装まで、チームでの課題開発に取り組みました。",
    exp3_date: "2024年 - 現在",
    exp3_title: "言語学・Webデザインの独学",
    exp3_org: "自主学習 (EN・CN・JP)",
    exp3_desc: "言語学への興味から英語・中国語・日本語の3言語を独学しながら、見やすく美しいWebデザインを学んでいます。",
    contact_title: "お問い合わせ",
    collab_title: "ぜひ繋がりましょう！",
    collab_desc: "Web開発やUI/UXデザインの相談、語学学習（英語・中国語・日本語）についてのお話など、いつでもお気軽にご連絡ください！",
    collab_loc: "インドネシア デル工科大学 (IT Del)",
    ph_name: "お名前",
    ph_email: "メールアドレス",
    ph_phone: "電話番号",
    ph_msg: "メッセージ",
    btn_send: "送信",
    footer_desc: "ポートフォリオをご覧いただきありがとうございます。SNSでもぜひ繋がりましょう。",
    footer_links: "クイックリンク",
    footer_contact: "連絡先"
  }
};

const langFlag = document.getElementById('langFlag');

const flagSvgs = {
  en: `<svg viewBox="0 0 24 24"><rect width="24" height="24" fill="#ffffff"/><rect y="0" width="24" height="3.5" fill="#dc2626"/><rect y="7" width="24" height="3.5" fill="#dc2626"/><rect y="14" width="24" height="3.5" fill="#dc2626"/><rect y="21" width="24" height="3" fill="#dc2626"/><rect width="12" height="13" fill="#1d4ed8"/><circle cx="3.5" cy="3.5" r="0.9" fill="#fff"/><circle cx="8.5" cy="3.5" r="0.9" fill="#fff"/><circle cx="6" cy="6.5" r="0.9" fill="#fff"/><circle cx="3.5" cy="9.5" r="0.9" fill="#fff"/><circle cx="8.5" cy="9.5" r="0.9" fill="#fff"/></svg>`,
  id: `<svg viewBox="0 0 24 24"><rect width="24" height="12" fill="#e11d48"/><rect y="12" width="24" height="12" fill="#ffffff"/></svg>`,
  ch: `<svg viewBox="0 0 24 24"><rect width="24" height="24" fill="#de2910"/><polygon points="6,3.5 6.9,6.2 9.7,6.2 7.4,7.8 8.3,10.5 6,8.8 3.7,10.5 4.6,7.8 2.3,6.2 5.1,6.2" fill="#ffde00"/><circle cx="11.5" cy="3.5" r="0.9" fill="#ffde00"/><circle cx="13" cy="5.5" r="0.9" fill="#ffde00"/><circle cx="13" cy="8" r="0.9" fill="#ffde00"/><circle cx="11.5" cy="10" r="0.9" fill="#ffde00"/></svg>`,
  jp: `<svg viewBox="0 0 24 24"><rect width="24" height="24" fill="#ffffff"/><circle cx="12" cy="12" r="5.5" fill="#e11d48"/></svg>`
};

function updateBirthdayByLang(lang) {
  const bdMonthYear = document.getElementById('bdMonthYear');
  const bdDayContainer = document.getElementById('bdDayContainer');

  const birthdayData = {
    en: { monthYear: 'June<br>2005', dayHtml: '<span class="bd-day-text">Thursday</span>' },
    id: { monthYear: 'Juni<br>2005', dayHtml: '<span class="bd-day-text">Kamis</span>' },
    ch: { monthYear: '6月<br>2005年', dayHtml: '<span class="hanzi-char">四</span><small>星期四</small>' },
    jp: { monthYear: '6月<br>2005年', dayHtml: '<span class="hanzi-char">木</span><small>木曜日</small>' }
  };

  const data = birthdayData[lang] || birthdayData.en;
  if (bdMonthYear) bdMonthYear.innerHTML = data.monthYear;
  if (bdDayContainer) bdDayContainer.innerHTML = data.dayHtml;
}

function setLanguage(lang) {
  if (langFlag) langFlag.innerHTML = flagSvgs[lang] || flagSvgs.en;
  if (typeof renderNotifications === 'function') renderNotifications();
  document.body.classList.remove('lang-en', 'lang-id', 'lang-ch', 'lang-jp');
  document.body.classList.add(`lang-${lang}`);

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (translations[lang] && translations[lang][key]) {
      el.textContent = translations[lang][key];
    }
  });

  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    if (translations[lang] && translations[lang][key]) {
      el.setAttribute('placeholder', translations[lang][key]);
    }
  });

  updateBirthdayByLang(lang);
  updateLiveClock();
  verticalScrollUpdaters.forEach(fn => fn());
}

if (langSelect) {
  langSelect.addEventListener('change', (e) => {
    setLanguage(e.target.value);
  });
}

// ================= 6. MINI PROFILE CARD (SMOOTH SCROLL + HOLD TO DRAG) =================
const miniSlidesTrack = document.getElementById('miniSlidesTrack');
const miniPrevBtn = document.getElementById('miniPrevBtn');
const miniNextBtn = document.getElementById('miniNextBtn');
const miniCounter = document.getElementById('miniCounter');
const miniDragTrack = document.getElementById('miniDragTrack');
const miniScrollThumb = document.getElementById('miniScrollThumb');

const totalMiniSlides = 3;
let currentSlide = 0;
let isDraggingMini = false;
let lastDragRatio = 0;

function applyMiniPosition(ratio, activeIdx) {
  if (miniSlidesTrack) miniSlidesTrack.style.transform = `translateX(-${ratio * (totalMiniSlides - 1) * 100}%)`;
  if (miniScrollThumb) miniScrollThumb.style.left = `${ratio * 66.6667}%`;

  const currStr = String(activeIdx + 1).padStart(2, '0');
  const totalStr = String(totalMiniSlides).padStart(2, '0');
  if (miniCounter) miniCounter.innerHTML = `${currStr} <small>/ ${totalStr}</small>`;
}

function updateMiniSlide() {
  const ratio = currentSlide / (totalMiniSlides - 1);
  applyMiniPosition(ratio, currentSlide);
  if (miniPrevBtn) miniPrevBtn.disabled = currentSlide === 0;
  if (miniNextBtn) miniNextBtn.disabled = currentSlide === totalMiniSlides - 1;
}

if (miniNextBtn && miniPrevBtn) {
  miniNextBtn.addEventListener('click', () => {
    if (currentSlide < totalMiniSlides - 1) { currentSlide++; updateMiniSlide(); }
  });
  miniPrevBtn.addEventListener('click', () => {
    if (currentSlide > 0) { currentSlide--; updateMiniSlide(); }
  });
}

if (miniDragTrack && miniSlidesTrack && miniScrollThumb) {
  const getRatioFromPointer = (clientX) => {
    const rect = miniDragTrack.getBoundingClientRect();
    return Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
  };

  miniDragTrack.addEventListener('pointerdown', (e) => {
    isDraggingMini = true;
    miniDragTrack.setPointerCapture(e.pointerId);
    miniDragTrack.classList.add('dragging');
    miniSlidesTrack.style.transition = 'none';
    miniScrollThumb.style.transition = 'none';

    lastDragRatio = getRatioFromPointer(e.clientX);
    applyMiniPosition(lastDragRatio, Math.round(lastDragRatio * (totalMiniSlides - 1)));
  });

  miniDragTrack.addEventListener('pointermove', (e) => {
    if (!isDraggingMini) return;
    lastDragRatio = getRatioFromPointer(e.clientX);
    applyMiniPosition(lastDragRatio, Math.round(lastDragRatio * (totalMiniSlides - 1)));
  });

  const finishDrag = () => {
    if (!isDraggingMini) return;
    isDraggingMini = false;
    miniDragTrack.classList.remove('dragging');
    miniSlidesTrack.style.transition = '';
    miniScrollThumb.style.transition = '';
    currentSlide = Math.round(lastDragRatio * (totalMiniSlides - 1));
    updateMiniSlide();
  };

  miniDragTrack.addEventListener('pointerup', finishDrag);
  miniDragTrack.addEventListener('pointercancel', finishDrag);
}

updateMiniSlide();

// ================= 7. LIVE CLOCK & DAILY DATE =================
function updateLiveClock() {
  const now = new Date();
  const liveClock = document.getElementById('liveClock');
  const liveDate = document.getElementById('liveDate');
  const liveDayName = document.getElementById('liveDayName');
  const currentLang = langSelect ? (langSelect.value || 'en') : 'en';

  const timeStr = now.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  });

  const localeMap = { en: 'en-US', id: 'id-ID', ch: 'zh-CN', jp: 'ja-JP' };
  const datePart = now.toLocaleDateString(localeMap[currentLang] || 'en-US', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });

  const dayNamesByLang = {
    en: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    id: ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'],
    ch: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
    jp: ['日曜日', '月曜日', '火曜日', '水曜日', '木曜日', '金曜日', '土曜日']
  };

  if (liveClock) liveClock.textContent = timeStr;
  if (liveDate) liveDate.textContent = datePart;
  if (liveDayName) {
    const daysList = dayNamesByLang[currentLang] || dayNamesByLang.en;
    liveDayName.textContent = daysList[now.getDay()];
  }
}

// ================= 8. BENTO CARD SLIDERS (PROJECTS, ACHIEVEMENTS, EXPERIENCES) =================
function initBentoCardSlider({ trackId, pagerId, itemSelector, perPage, pageClass }) {
  const track = document.getElementById(trackId);
  const pager = document.getElementById(pagerId);
  if (!track || !pager) return;

  const items = Array.from(track.querySelectorAll(itemSelector));
  const totalPages = Math.ceil(items.length / perPage) || 1;

  track.innerHTML = '';
  for (let p = 0; p < totalPages; p++) {
    const pageDiv = document.createElement('div');
    pageDiv.className = `bento-page ${pageClass}`;
    items.slice(p * perPage, (p + 1) * perPage).forEach(item => pageDiv.appendChild(item));
    track.appendChild(pageDiv);
  }

  const prevBtn = pager.querySelector('.pager-prev');
  const nextBtn = pager.querySelector('.pager-next');
  const counterEl = pager.querySelector('.pager-counter');
  const dragTrack = pager.querySelector('.pager-track');
  const thumb = pager.querySelector('.pager-thumb');

  let currPage = 0;
  let isDragging = false;
  let lastRatio = 0;

  if (thumb) thumb.style.width = `${100 / totalPages}%`;

  function applyPos(ratio, activeIdx) {
    if (totalPages <= 1) {
      track.style.transform = 'translateX(0%)';
      if (thumb) thumb.style.left = '0%';
    } else {
      const maxLeftPercent = ((totalPages - 1) / totalPages) * 100;
      track.style.transform = `translateX(-${ratio * (totalPages - 1) * 100}%)`;
      if (thumb) thumb.style.left = `${ratio * maxLeftPercent}%`;
    }
    const currStr = String(activeIdx + 1).padStart(2, '0');
    const totalStr = String(totalPages).padStart(2, '0');
    if (counterEl) counterEl.innerHTML = `${currStr} <small>/ ${totalStr}</small>`;
  }

  function updateSlider() {
    const ratio = totalPages > 1 ? currPage / (totalPages - 1) : 0;
    applyPos(ratio, currPage);
    if (prevBtn) prevBtn.disabled = currPage === 0;
    if (nextBtn) nextBtn.disabled = currPage >= totalPages - 1;
  }

  if (prevBtn && nextBtn) {
    prevBtn.addEventListener('click', () => {
      if (currPage > 0) { currPage--; updateSlider(); }
    });
    nextBtn.addEventListener('click', () => {
      if (currPage < totalPages - 1) { currPage++; updateSlider(); }
    });
  }

  if (dragTrack && thumb) {
    const getRatio = (clientX) => {
      const rect = dragTrack.getBoundingClientRect();
      return Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
    };

    dragTrack.addEventListener('pointerdown', (e) => {
      if (totalPages <= 1) return;
      isDragging = true;
      dragTrack.setPointerCapture(e.pointerId);
      dragTrack.classList.add('dragging');
      track.style.transition = 'none';
      thumb.style.transition = 'none';

      lastRatio = getRatio(e.clientX);
      applyPos(lastRatio, Math.round(lastRatio * (totalPages - 1)));
    });

    dragTrack.addEventListener('pointermove', (e) => {
      if (!isDragging) return;
      lastRatio = getRatio(e.clientX);
      applyPos(lastRatio, Math.round(lastRatio * (totalPages - 1)));
    });

    const endDrag = () => {
      if (!isDragging) return;
      isDragging = false;
      dragTrack.classList.remove('dragging');
      track.style.transition = '';
      thumb.style.transition = '';
      currPage = Math.round(lastRatio * (totalPages - 1));
      updateSlider();
    };

    dragTrack.addEventListener('pointerup', endDrag);
    dragTrack.addEventListener('pointercancel', endDrag);
  }

  updateSlider();
}

initBentoCardSlider({
  trackId: 'projTrack',
  pagerId: 'projPager',
  itemSelector: '.project-card',
  perPage: 3,
  pageClass: 'projects-cards-grid'
});

initBentoCardSlider({
  trackId: 'achTrack',
  pagerId: 'achPager',
  itemSelector: '.ach-card',
  perPage: 4,
  pageClass: 'ach-mini-grid'
});

initBentoCardSlider({
  trackId: 'expTrack',
  pagerId: 'expPager',
  itemSelector: '.timeline-item',
  perPage: 3,
  pageClass: 'timeline'
});

// ================= 9. ACHIEVEMENTS & EXPERIENCES MODAL PREVIEW =================
const achModal = document.getElementById('achModal');
const achModalClose = document.getElementById('achModalClose');
const modalIssuer = document.getElementById('modalIssuer');
const modalPreviewArea = document.getElementById('modalPreviewArea');
const modalTitle = document.getElementById('modalTitle');
const modalDate = document.getElementById('modalDate');

document.addEventListener('click', (e) => {
  const activeLang = langSelect ? (langSelect.value || 'en') : 'en';
  const t = translations[activeLang] || translations.en;

  // 1. Klik pada Kartu Achievement
  const card = e.target.closest('.ach-card');
  if (card) {
    const issuer = card.querySelector('.ach-issuer')?.textContent || '';
    const title = card.querySelector('.ach-title')?.textContent || '';
    const date = card.querySelector('.ach-date')?.textContent || '';
    const imgEl = card.querySelector('.ach-img-box img');
    const pdfPath = card.getAttribute('data-pdf') || card.querySelector('.ach-img-box')?.getAttribute('data-pdf');
    const placeholderEl = card.querySelector('.ach-placeholder');

    if (modalIssuer) modalIssuer.textContent = issuer;
    if (modalTitle) modalTitle.textContent = title;
    if (modalDate) modalDate.textContent = date;

    if (modalPreviewArea) {
      modalPreviewArea.innerHTML = '';

      // JIKA FORMAT PDF
      if (pdfPath) {
        modalPreviewArea.innerHTML = `
          <div style="width: 100%; display: flex; flex-direction: column; gap: 12px; align-items: center;">
            <iframe src="${pdfPath}#toolbar=0" style="width: 100%; height: 350px; border: none; border-radius: 12px; background: #fff;"></iframe>
            <a href="${pdfPath}" target="_blank" class="btn-primary" style="font-size: 0.85rem; padding: 8px 18px; text-decoration: none;">
              <i class="fa-solid fa-arrow-up-right-from-square"></i> ${t.btn_open_pdf}
            </a>
          </div>
        `;
      } 
      // JIKA FORMAT GAMBAR BIASA
      else if (imgEl) {
        const clonedImg = document.createElement('img');
        clonedImg.src = imgEl.src;
        clonedImg.alt = title;
        clonedImg.style.maxWidth = '100%';
        clonedImg.style.maxHeight = '350px';
        clonedImg.style.objectFit = 'contain';
        modalPreviewArea.appendChild(clonedImg);
      } 
      // JIKA PLACEHOLDER
      else if (placeholderEl) {
        modalPreviewArea.appendChild(placeholderEl.cloneNode(true));
      }
    }

    if (achModal) achModal.classList.add('open');
    return;
  }

  // 2. Klik pada Tombol Foto Experience
  const expBtn = e.target.closest('.exp-photo-btn');
  if (expBtn) {
    const expCard = expBtn.closest('.exp-card');
    const title = expCard.querySelector('h4')?.textContent || '';
    const org = expCard.querySelector('.exp-org')?.textContent || '';
    const date = expCard.querySelector('.time-badge')?.textContent || '';
    const imgSrc = expBtn.getAttribute('data-img');

    if (modalIssuer) modalIssuer.textContent = org;
    if (modalTitle) modalTitle.textContent = title;
    if (modalDate) modalDate.textContent = date;

    if (modalPreviewArea) {
      modalPreviewArea.innerHTML = '';
      if (imgSrc) {
        const img = document.createElement('img');
        img.src = imgSrc;
        img.alt = title;
        img.style.maxWidth = '100%';
        img.style.maxHeight = '350px';
        img.style.objectFit = 'contain';
        modalPreviewArea.appendChild(img);
      } else {
        modalPreviewArea.innerHTML = `
          <div class="ach-placeholder" style="height: 200px;">
            <i class="fa-regular fa-image" style="font-size: 3rem;"></i>
            <span>${t.no_photo}</span>
          </div>`;
      }
    }

    if (achModal) achModal.classList.add('open');
  }
});

function closeAchModal() {
  if (achModal) achModal.classList.remove('open');
}

if (achModalClose) achModalClose.addEventListener('click', closeAchModal);
if (achModal) {
  achModal.addEventListener('click', (e) => {
    if (e.target === achModal) closeAchModal();
  });
}
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeAchModal();
});

// ================= 10. VERTICAL SCROLL & HOLD-TO-DRAG (ABOUT & SKILLS) =================
function initVerticalScrollCard({ boxId, trackId, thumbId, upBtnId, downBtnId }) {
  const box = document.getElementById(boxId);
  const track = document.getElementById(trackId);
  const thumb = document.getElementById(thumbId);
  const upBtn = document.getElementById(upBtnId);
  const downBtn = document.getElementById(downBtnId);
  if (!box || !track || !thumb) return;

  let isDragging = false;

  function syncVerticalBar() {
    const scrollable = box.scrollHeight - box.clientHeight;
    if (scrollable <= 2) {
      thumb.style.height = '100%';
      thumb.style.top = '0%';
      if (upBtn) upBtn.disabled = true;
      if (downBtn) downBtn.disabled = true;
      return;
    }

    const thumbPercent = Math.max(25, (box.clientHeight / box.scrollHeight) * 100);
    const ratio = box.scrollTop / scrollable;

    thumb.style.height = `${thumbPercent}%`;
    thumb.style.top = `${ratio * (100 - thumbPercent)}%`;

    if (upBtn) upBtn.disabled = box.scrollTop <= 1;
    if (downBtn) downBtn.disabled = box.scrollTop >= scrollable - 1;
  }

  box.addEventListener('scroll', syncVerticalBar);

  if (upBtn && downBtn) {
    upBtn.addEventListener('click', () => {
      box.scrollBy({ top: -box.clientHeight * 0.85, behavior: 'smooth' });
    });
    downBtn.addEventListener('click', () => {
      box.scrollBy({ top: box.clientHeight * 0.85, behavior: 'smooth' });
    });
  }

  function dragToY(clientY) {
    const scrollable = box.scrollHeight - box.clientHeight;
    if (scrollable <= 2) return;

    const rect = track.getBoundingClientRect();
    const thumbH = thumb.offsetHeight;
    const usable = Math.max(1, rect.height - thumbH);
    const ratio = Math.max(0, Math.min(1, (clientY - rect.top - thumbH / 2) / usable));

    box.scrollTop = ratio * scrollable;
  }

  track.addEventListener('pointerdown', (e) => {
    isDragging = true;
    track.setPointerCapture(e.pointerId);
    track.classList.add('dragging');
    box.style.scrollBehavior = 'auto';
    dragToY(e.clientY);
  });

  track.addEventListener('pointermove', (e) => {
    if (!isDragging) return;
    dragToY(e.clientY);
  });

  const endDrag = () => {
    if (!isDragging) return;
    isDragging = false;
    track.classList.remove('dragging');
    box.style.scrollBehavior = 'smooth';
  };

  track.addEventListener('pointerup', endDrag);
  track.addEventListener('pointercancel', endDrag);

  syncVerticalBar();
  verticalScrollUpdaters.push(syncVerticalBar);
}

initVerticalScrollCard({
  boxId: 'aboutScrollBox',
  trackId: 'aboutTrack',
  thumbId: 'aboutThumb',
  upBtnId: 'aboutUpBtn',
  downBtnId: 'aboutDownBtn'
});

initVerticalScrollCard({
  boxId: 'skillsScrollBox',
  trackId: 'skillsTrack',
  thumbId: 'skillsThumb',
  upBtnId: 'skillsUpBtn',
  downBtnId: 'skillsDownBtn'
});

window.addEventListener('resize', () => {
  verticalScrollUpdaters.forEach(fn => fn());
});

/// ================= 10B. VISITOR NOTE WALL (ORISINAL BENTO) =================
initVerticalScrollCard({
  boxId: 'guestScrollBox',
  trackId: 'guestTrack',
  thumbId: 'guestThumb',
  upBtnId: 'guestUpBtn',
  downBtnId: 'guestDownBtn'
});

const guestForm = document.getElementById('guestForm');
const chatFeed = document.getElementById('chatFeed');
const guestScrollBox = document.getElementById('guestScrollBox');
const vibeChips = document.querySelectorAll('.vibe-chip');
let selectedVibe = '✨ Aesthetic';

vibeChips.forEach(chip => {
  chip.addEventListener('click', () => {
    vibeChips.forEach(c => c.classList.remove('active'));
    chip.classList.add('active');
    selectedVibe = chip.getAttribute('data-vibe');
  });
});

function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

function createNoteCard(item) {
  const initial = escapeHtml((item.name || 'G').trim().charAt(0).toUpperCase());
  const vibeText = escapeHtml(item.vibe || '✨ Note');
  const shortDate = escapeHtml((item.time || '').split(',')[0]);

  const el = document.createElement('div');
  el.className = 'note-card';
  el.innerHTML = `
    <div class="note-top">
      <div class="note-author">
        <span class="note-avatar">${initial}</span>
        <div>
          <strong>${escapeHtml(item.name)}</strong>
          <small>${shortDate}</small>
        </div>
      </div>
      <span class="note-vibe">${vibeText}</span>
    </div>
    <p class="note-text">${escapeHtml(item.msg)}</p>
  `;
  return el;
}

function renderSavedMessages() {
  if (!chatFeed) return;
  const saved = JSON.parse(localStorage.getItem('porto_guestbook') || '[]');
  saved.forEach(item => {
    chatFeed.prepend(createNoteCard(item));
  });
  verticalScrollUpdaters.forEach(fn => fn());
}

if (guestForm && chatFeed) {
  renderSavedMessages();

  guestForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('guestName').value.trim();
    const msg = document.getElementById('guestMsg').value.trim();
    if (!name || !msg) return;

    const now = new Date();
    const pad = (n) => String(n).padStart(2, '0');
    const timeStr = `${pad(now.getDate())}/${pad(now.getMonth() + 1)}/${now.getFullYear()}, ${pad(now.getHours())}:${pad(now.getMinutes())}`;

    const newItem = { name, msg, time: timeStr, vibe: selectedVibe };
    const saved = JSON.parse(localStorage.getItem('porto_guestbook') || '[]');
    saved.push(newItem);
    localStorage.setItem('porto_guestbook', JSON.stringify(saved));

    chatFeed.prepend(createNoteCard(newItem));

    if (typeof pushGuestNotification === 'function') {
      pushGuestNotification(name, msg, timeStr);
    }
    if (guestScrollBox) guestScrollBox.scrollTop = 0;
    verticalScrollUpdaters.forEach(fn => fn());
    guestForm.reset();
  });
}

// ================= 10C. HEADER NOTIFICATION (TERHUBUNG KE GUESTBOOK) =================
const notifWrapper = document.getElementById('notifWrapper');
const notifBtn = document.getElementById('notifBtn');
const notifBadge = document.getElementById('notifBadge');
const notifDropdown = document.getElementById('notifDropdown');
const notifList = document.getElementById('notifList');
const notifMarkRead = document.getElementById('notifMarkRead');

function getNotifications() {
  const stored = localStorage.getItem('porto_notifs');
  if (stored) return JSON.parse(stored);
  // Contoh 1 notifikasi awal dari pesan pertama Guestbook
  const initial = [{ name: "Raka Pratama", msg: "Keren banget portofolio Bento UI-nya!", time: "23/11/2026, 14:20", unread: true }];
  localStorage.setItem('porto_notifs', JSON.stringify(initial));
  return initial;
}

function renderNotifications() {
  if (!notifList || !notifBadge) return;
  const notifs = getNotifications();
  const unreadCount = notifs.filter(n => n.unread).length;
  const activeLang = langSelect ? (langSelect.value || 'en') : 'en';
  const t = translations[activeLang] || translations.en;

  notifBadge.textContent = unreadCount;
  notifBadge.classList.toggle('hidden', unreadCount === 0);

  notifList.innerHTML = '';
  if (notifs.length === 0) {
    notifList.innerHTML = `<div class="notif-empty">${t.notif_empty}</div>`;
    return;
  }

  notifs.forEach((n, index) => {
    const item = document.createElement('div');
    item.className = `notif-item ${n.unread ? 'unread' : ''}`;
    item.innerHTML = `
      <span class="notif-dot"></span>
      <div class="notif-text">
        <p><strong>${escapeHtml(n.name)}</strong> ${t.notif_left_msg}: "${escapeHtml(n.msg)}"</p>
        <small>${escapeHtml(n.time)}</small>
      </div>
    `;
    item.addEventListener('click', () => {
      const list = getNotifications();
      if (list[index]) list[index].unread = false;
      localStorage.setItem('porto_notifs', JSON.stringify(list));
      renderNotifications();
      if (notifDropdown) notifDropdown.classList.remove('open');
      document.getElementById('guestbook')?.scrollIntoView({ behavior: 'smooth' });
    });
    notifList.appendChild(item);
  });
}

function pushGuestNotification(name, msg, time) {
  const list = getNotifications();
  list.unshift({ name, msg, time, unread: true });
  if (list.length > 10) list.pop(); // Simpan maksimal 10 notif terbaru
  localStorage.setItem('porto_notifs', JSON.stringify(list));
  renderNotifications();

  if (notifBtn) {
    notifBtn.classList.remove('ringing');
    void notifBtn.offsetWidth; // Reset animasi
    notifBtn.classList.add('ringing');
  }
}

if (notifBtn && notifDropdown) {
  notifBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    notifDropdown.classList.toggle('open');
  });

  document.addEventListener('click', (e) => {
    if (notifWrapper && !notifWrapper.contains(e.target)) {
      notifDropdown.classList.remove('open');
    }
  });
}

if (notifMarkRead) {
  notifMarkRead.addEventListener('click', () => {
    const list = getNotifications().map(n => ({ ...n, unread: false }));
    localStorage.setItem('porto_notifs', JSON.stringify(list));
    renderNotifications();
  });
}

// ================= 11. JALANKAN SAAT HALAMAN PERTAMA DIBUKA =================
setLanguage(langSelect ? (langSelect.value || 'en') : 'en');
setInterval(updateLiveClock, 1000);

// ================= 12. INTERACTIVE TRANSITIONS, SCROLL REVEAL & CLICK RIPPLE FX =================

// A. Garis Progres Scroll & Auto-Highlight Menu Header saat Scroll
const scrollProgress = document.getElementById('scrollProgress');
const trackedSections = ['home', 'about', 'skills', 'projects', 'achievements', 'experiences', 'guestbook']
  .map(id => document.getElementById(id))
  .filter(Boolean);

function handleScrollUI() {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const sideArtLeft = document.getElementById('sideArtLeft');
  const sideArtRight = document.getElementById('sideArtRight');
  if (sideArtLeft) sideArtLeft.style.transform = `translateY(${scrollTop * -0.05}px)`;
  if (sideArtRight) sideArtRight.style.transform = `translateY(${scrollTop * 0.04}px)`;
  if (scrollProgress && docHeight > 0) {
    scrollProgress.style.width = `${(scrollTop / docHeight) * 100}%`;
  }

  let currentId = 'home';
  trackedSections.forEach(sec => {
    const top = sec.getBoundingClientRect().top;
    if (top <= 180) currentId = sec.id;
  });

  navItems.forEach(link => {
    const href = link.getAttribute('href');
    link.classList.toggle('active', href === `#${currentId}`);
  });
}

window.addEventListener('scroll', handleScrollUI, { passive: true });
handleScrollUI();

// B. Animasi Kartu Muncul Halus saat Di-Scroll (Scroll Reveal)
const allBentoCards = document.querySelectorAll('.card');
allBentoCards.forEach(card => card.classList.add('reveal-card'));

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.08 });

allBentoCards.forEach(card => revealObserver.observe(card));

// C. Efek Parallax Halus Saat Mouse Bergerak di Atas Hero Card
const heroMainCard = document.querySelector('.hero-main-card');
const heroAvatar = document.querySelector('.hero-avatar');
const heroWaveSvg = document.getElementById('heroWaveSvg');
const heroGlyphTop = document.getElementById('heroGlyphTop');
const heroGlyphBottom = document.getElementById('heroGlyphBottom');

if (heroMainCard) {
  heroMainCard.addEventListener('mousemove', (e) => {
    const rect = heroMainCard.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    if (heroAvatar) heroAvatar.style.transform = `translate(${x * -10}px, ${y * -6}px)`;
    if (heroWaveSvg) heroWaveSvg.style.transform = `translateX(${x * 12}px)`;
    if (heroGlyphTop) heroGlyphTop.style.transform = `rotate(-10deg) translate(${x * 14}px, ${y * 10}px)`;
    if (heroGlyphBottom) heroGlyphBottom.style.transform = `rotate(6deg) translate(${x * -14}px, ${y * 8}px)`;
  });

  heroMainCard.addEventListener('mouseleave', () => {
    if (heroAvatar) heroAvatar.style.transform = 'translate(0, 0)';
    if (heroWaveSvg) heroWaveSvg.style.transform = 'translateX(0)';
    if (heroGlyphTop) heroGlyphTop.style.transform = 'rotate(-10deg) translate(0, 0)';
    if (heroGlyphBottom) heroGlyphBottom.style.transform = 'rotate(6deg) translate(0, 0)';
  });
}

// D. Canvas: Partikel Cahaya Mengambang + Efek Riak & Bintang Setiap Kali Klik
const fxCanvas = document.getElementById('fxCanvas');
if (fxCanvas) {
  const ctx = fxCanvas.getContext('2d');
  let width = fxCanvas.width = window.innerWidth;
  let height = fxCanvas.height = window.innerHeight;

  window.addEventListener('resize', () => {
    width = fxCanvas.width = window.innerWidth;
    height = fxCanvas.height = window.innerHeight;
  });

  // Partikel debu cahaya lembut di latar
  const ambientMotes = Array.from({ length: 24 }, () => ({
    x: Math.random() * width,
    y: Math.random() * height,
    r: Math.random() * 1.8 + 0.8,
    vx: (Math.random() - 0.5) * 0.25,
    vy: -Math.random() * 0.35 - 0.1,
    alpha: Math.random() * 0.35 + 0.1
  }));

  const ripples = [];
  const sparks = [];

  window.addEventListener('click', (e) => {
    ripples.push({ x: e.clientX, y: e.clientY, r: 4, alpha: 0.55 });
    for (let i = 0; i < 7; i++) {
      const angle = (Math.PI * 2 * i) / 7 + Math.random() * 0.4;
      const speed = Math.random() * 2.2 + 1.2;
      sparks.push({
        x: e.clientX,
        y: e.clientY,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        size: Math.random() * 2.2 + 1.5,
        alpha: 0.9
      });
    }
  });

  function animateFX() {
    ctx.clearRect(0, 0, width, height);
    const isDark = document.body.classList.contains('dark-mode');
    const baseColor = isDark ? '134, 180, 240' : '83, 135, 208';

    // Gambar partikel latar mengambang
    ambientMotes.forEach(m => {
      m.x += m.vx;
      m.y += m.vy;
      if (m.y < -10) { m.y = height + 10; m.x = Math.random() * width; }
      if (m.x < -10) m.x = width + 10;
      if (m.x > width + 10) m.x = -10;

      ctx.beginPath();
      ctx.arc(m.x, m.y, m.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${baseColor}, ${m.alpha})`;
      ctx.fill();
    });

    // Gambar riak klik
    for (let i = ripples.length - 1; i >= 0; i--) {
      const rp = ripples[i];
      rp.r += 2.2;
      rp.alpha -= 0.02;
      if (rp.alpha <= 0) {
        ripples.splice(i, 1);
        continue;
      }
      ctx.beginPath();
      ctx.arc(rp.x, rp.y, rp.r, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(${baseColor}, ${rp.alpha})`;
      ctx.lineWidth = 1.5;
      ctx.stroke();
    }

    // Gambar percikan bintang klik
    for (let i = sparks.length - 1; i >= 0; i--) {
      const sp = sparks[i];
      sp.x += sp.vx;
      sp.y += sp.vy;
      sp.vx *= 0.95;
      sp.vy *= 0.95;
      sp.alpha -= 0.032;
      if (sp.alpha <= 0) {
        sparks.splice(i, 1);
        continue;
      }
      ctx.beginPath();
      ctx.arc(sp.x, sp.y, sp.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${baseColor}, ${sp.alpha})`;
      ctx.fill();
    }

    requestAnimationFrame(animateFX);
  }

  animateFX();
}