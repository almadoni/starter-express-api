-- phpMyAdmin SQL Dump
-- version 4.7.1
-- https://www.phpmyadmin.net/
--
-- Host: sql12.freesqldatabase.com
-- Generation Time: Jun 20, 2023 at 04:27 AM
-- Server version: 5.5.62-0ubuntu0.14.04.1
-- PHP Version: 7.0.33-0ubuntu0.16.04.16

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `sql12626600`
--

-- --------------------------------------------------------

--
-- Table structure for table `accounts`
--

CREATE TABLE `accounts` (
  `id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(50) NOT NULL,
  `email` varchar(255) NOT NULL,
  `fullname` varchar(100) NOT NULL,
  `created_on` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `last_login` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `session_id` varchar(100) DEFAULT NULL,
  `firebase_id` varchar(255) DEFAULT NULL,
  `mahasiswa_id` varchar(100) DEFAULT NULL,
  `status` varchar(100) DEFAULT NULL,
  `active` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `accounts`
--

INSERT INTO `accounts` (`id`, `username`, `password`, `email`, `fullname`, `created_on`, `last_login`, `session_id`, `firebase_id`, `mahasiswa_id`, `status`, `active`) VALUES
(1, 'almadoni', 'doni', 'almadoni@gmail.com', 'Almadoni', '2023-06-17 05:39:32', '0000-00-00 00:00:00', NULL, 'eP7gzJMJS5Wqa210lBSIv4:APA91bHF6551ZZJyUbqXleUpzqJb41m6LMFEwwH9J-YXF5gjVVpifxbIDI2YSOxWcR7jWvm8EaajWEqZNaLIt1Ega6SZxqCSQrL7OcJpji29LvtCjne2mnq7CFN8MeiYztiHJ3rmXRRi', NULL, 'Admin', 0);

-- --------------------------------------------------------

--
-- Table structure for table `answer`
--

CREATE TABLE `answer` (
  `id` int(11) NOT NULL,
  `option1` varchar(255) NOT NULL,
  `option2` varchar(255) NOT NULL,
  `option3` varchar(255) NOT NULL,
  `option4` varchar(255) NOT NULL,
  `option_answer` int(11) NOT NULL,
  `question_id` int(11) DEFAULT NULL,
  `option5` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `answer`
--

INSERT INTO `answer` (`id`, `option1`, `option2`, `option3`, `option4`, `option_answer`, `question_id`, `option5`) VALUES
(1, 'Politikos', 'Politik', 'Polis', 'Policy', 2, 1, 'Poli'),
(2, ' Hornby', 'Surbakti', 'Andrey Heywood', 'Budiardjo', 3, 2, 'Kartono'),
(3, 'Faktor sifat kepribadian ', 'Faktor sosio-kognitif', 'Faktor-faktor psikodemografis', 'Faktor ekstraversi', 3, 3, 'Faktor media '),
(4, 'perwakilan presiden oleh wakil presiden jika presiden berhalangan', ' lamanya presiden dan wakil presiden memegang jabatannya', 'hak presiden', 'sumpah janji presiden dan wakil presiden', 2, 4, 'presiden memegang kekuasaan'),
(5, 'Hukum tertulis dan hukum tidak tertulis', 'Good governance dan clean government', 'Hukum transparancy dan hukum responsiveness', 'Hukum privat dan hukum publik', 4, 5, 'Hukum doktrin  dan Hukum adat'),
(6, 'transparansi, penegakan hukum, partisipasi dan responsif', 'konsensus, kesetaraan, korup dan efektivitas ', 'efisiensi, akuntabilitas, ekslusif  dan visi strategis', 'responsif, provokatif, konsensus dan kesetaraan, ', 1, 6, 'efektivitas, efisiensi, akuntabilitas dan elitis'),
(7, 'Parlementer', 'Presedensial', 'Liberal', 'Terpimpin', 2, 7, 'Mutlak '),
(8, 'Konfrensi Meja Bundar', 'Perjanjian Linggarjati', 'Disahkannya UUDS 1950', 'Supersemar', 5, 8, 'Dekrit Presiden 5 Juli 1959'),
(9, 'Janur Kuning', 'Konstituante', 'G 30 S PKI', 'Maklumat X', 3, 9, 'APRA'),
(10, ' Partai Persatuan Pembangunan (PPP), Partai Demokrasi Indonesia (PDI), dan Golongan Karya (Golkar).', ' Partai NU (PNU), Partai Demokrasi Indonesia (PDI), dan Golongan Karya (Golkar).', 'Partai Persatuan Pembangunan (PPP), Partai Nasional Indonesia (PNI), dan Golongan Karya (Golkar).', 'Partai Persatuan Pembangunan (PPP), Partai Demokrat Indonesia (PDI), dan Golongan Karya (Golkar).', 1, 10, 'Partai Karya Pembangunan (PPP), Partai Demokrasi Indonesia (PDI), dan Golongan Karya (Golkar).'),
(11, '15 partai politik', '20 partai politik', '24 partai politik', '38 partai politik', 2, 11, '48 partai politik'),
(12, 'Ekologi', 'Ekonomi', 'Argonomi', 'Produksi', 2, 12, 'Koperasi '),
(13, 'Barang apa yang akan diproduksi, bagaimana barang tersebut diproduksi, untuk siapa barang tersebut diproduksi', 'Kebutuhan manusia adalah titik pangkal kegiatan perekonomian serta menjadi tujuan akhir kegiatan perekonomian', 'Manusia adalah makhluk yang tidak pernah merasa puas atas apa yang telah diperolehnya', 'Sebuah aksioma dalam ilmu ekonomi mengatakan bahwa manusia yang rasional selalu bertindak untuk memaksimalkan kepuasannya', 1, 13, 'Manusia yang rasional senantiasa berusaha memenuhi kepentingan pribadinya'),
(14, 'Pemenuhan kebutuhan merupakan pendorong paling besar bagi manusia untuk melakukan kegiatan ekonomi ', 'Manusia yang rasional selalu bertindak untuk memaksimalkan kepuasannya ', 'Tindakan manusia yang dilakukan untuk memenuhi kebutuhan hidupnya', 'Kebutuhan manusia adalah titik pangkal kegiatan perekonomian', 5, 14, 'Dengan pengorbanan tertentu dapat memperoleh hasil/kepuasan yang setinggi-tingginya '),
(15, 'Rumah untuk tempat bernaung. ', 'Makanan dan minuman yang cukup.', 'Kendaraan yang cepat', 'Perawatan kesehatan dasar', 3, 15, 'Pakaian yang layak'),
(16, 'Bertindak emosional, ekonomis dan menyusun skala prioritas', 'Bertindak rasional, ekonomis dan menyusun skala keinginan', 'Bertindak rasional, ekologis dan menyusun skala prioritas', 'Bertindak rasional, ekonomis dan menyusun skala prioritas', 4, 16, 'Bertindak sosial, ekonomis dan menyusun skala prioritas'),
(17, 'Konsumsi', 'Distribusi', 'Produksi', 'Ekonomi', 3, 17, 'Prioritas'),
(18, 'form utility, place utility, time utility dan ownership utility', 'quality utility, place utility, time utility dan ownership utility', 'form utility, place utility, package utility dan ownership utility', 'form utility, place utility, time utility dan input utility', 1, 18, 'form utility, place utility, input utility dan ownership utility'),
(19, 'Modal', 'Sumberdaya', 'Kewirausahaan ', ' Alam', 3, 19, 'Konsumsi'),
(20, 'Utama', 'Priotitas', 'Pokok', 'Tambahan', 4, 20, 'Cadangan'),
(21, 'Kebutuhan bertahan hidup dengan layak', 'Gaya hidup dan status sosial', 'Sumber kenyaman dan kemudahan', 'Kebutuhan dasar', 2, 21, 'Kebutuhan utama '),
(22, 'Perizinan, Adat Istiadat, Prakiraan harga dan Iklan', 'Penghasilan, Adat Istiadat, Prakiraan harga dan Iklan', 'Penghasilan, jumlah keluarga, Prakiraan harga dan Iklan', 'Kegunaan, Adat Istiadat, Prakiraan harga dan Iklan', 2, 22, 'Penghasilan, Adat Istiadat, Kenyamanan dan Iklan'),
(23, 'Peraturan Presiden Republik Indonesia No.112 Tahun 2007', 'Peraturan Presiden Republik Indonesia No.112 Tahun 2008', 'Peraturan Presiden Republik Indonesia No.113 Tahun 2007', 'Peraturan Mentri Perdagangan Republik Indonesia No.112 Tahun 2007', 1, 23, 'Peraturan Mentri Perdagangan Republik Indonesia No.112 Tahun 2008'),
(24, 'Pasar barang nyata dan pasar barang abstrak', 'Pasar persaingan sempurna dan pasar persaingan tidak sempurna', 'Pasar tradisional dan pasar modern', 'Pasar harian, pasar mingguan dan pasar bulanan', 3, 24, 'Pasar regional, pasar lingkungan dan pasar wilayah'),
(25, 'Berdasarkan manajemennya', 'Berdasarkan strukturnya (jumlah penjual dan pembeli)', 'Berdasarkan waktu terjadinya pasar', 'Berdasarkan lokasi', 2, 25, 'Berdasarkan kemampuan pelayanannya'),
(26, 'Menggunakan Data distribusi dan data pasar ', 'Menggunakan data pendapatan dan data konsumsi', 'Menggunakan data jaminan sosial dan rehabilitasi sosial', 'Menggunakan data kebahagian dan kepuasan', 2, 26, 'Menggunakan data produksi dan data konsumsi'),
(27, 'Tingkat pembangunan manusia yang tinggi. ', 'Tingkat pembangunan manusia melalui lembaga pendidikan. ', 'Tingkat kesejahteraan ', 'Tingkat upah yang diterima', 1, 27, 'Tingkat perkembangan manusia'),
(28, 'Terbentuknya persahabatan antar-negara', 'Meningkatkan kemakmuran', 'Menciptakan spesialisasi', 'Terbentuknya ketergantungan antar negara', 4, 28, 'Kestabilan harga'),
(29, 'Jual-beli atau tukar-menukar barang dan jasa. ', 'Kerja sama di bidang ekonomi', 'Pertukaran politik negara', 'Pertukaran serta perluasan penggunaan teknologi.', 3, 29, 'Pergerakan sumber daya'),
(30, 'Rate', 'Kurs', 'Exchange', 'Spot', 2, 30, 'Daily averages'),
(31, '6.98 USD', '69.8 USD', '143275.5 USD', '1432755 USD', 1, 31, '1432755000 USD '),
(32, 'Hotspot', 'Kreasi intelektual', 'Ekonomi kreatif', 'Daily averages', 3, 32, 'Ekonomi inovasi'),
(33, 'Membuka lapangan pekerjaan baru bagi masyarakat Indonesia', 'Menguatkan nilai konsumsi masyarakat', 'Mengurangi pertumbuhan angka pengangguran', ' Menciptakan masyarakat Indonesia yang kreatif dan inovatif', 2, 33, 'Kompetisi aktivitas dunia bisnis yang lebih sehat'),
(34, 'Ilmu', 'Pengetahuan', 'Teknologi', 'Technicoas', 1, 34, 'IPTEK  '),
(35, 'Pengetahuan yang terorganisir', 'Ilmu pengetahuan terapan', ' Ilmu pengetahuan secara abstrak', 'Pembuatan penemuan baru, ', 2, 35, 'Terminologi'),
(36, 'Pengertian ilmu pengetahuan dan teknologi', 'Dampak utama ilmu pengetahuan dan teknologi', 'Fungsi utama ilmu pengetahuan dan teknologi', 'Makna ilmu pengetahuan dan teknologi', 3, 36, 'Tantangan ilmu pengetahuan dan teknologi'),
(37, 'Teknologi, manusia dan cara penggunaannya ', 'Alat, lingkungan, dan budaya', 'Manusia, alat, dan budaya', 'Manusia, lingkungan, dan budaya', 4, 37, 'Manusia, karakter, dan budaya'),
(38, 'Memecahkan masalah', 'Membuat penemuan baru', ' Menjawab pertanyaan', 'Menambah pengetahuan', 1, 38, 'Menciptakan taraf hidup'),
(39, 'Manusia semakin kritis dalam berpikir dan semakin disiplin dalam bekerja', 'Semakin disiplin dalam bekerja dan semakin efisien dalam bertindak', 'Manusia semakin kritis dalam berpikir dan semakin efisien dalam bertindak', 'Merasa dibuai dengan semua fasilitas dan semakin efisien dalam bertindak', 4, 39, 'Semakin kritis dalam berpikir'),
(40, 'Munculnya media masa elektronik yang dapat menjadi sumber ilmu dan informasi pendidikan.', 'Munculnya berbagai macam metode pembelajaran yang baru, sehingga memudahkan pelajar memahami materi-materi pelajaran. ', 'Meningkatkan produktivitas dalam dunia industri', 'Mempermudah sistem pembelajaran.', 3, 40, 'Mempermudah dalam mengolah data nilai dengan menggunakan IPTEK'),
(41, 'Pendidikan', 'Ekonomi', 'Sosial budaya', 'Industri', 3, 41, 'Politik '),
(42, ' Arus informasi yang berkembang cepat', 'Manusia sebagai pelaku yang menggeluti bidang penelitian dan Pengembangan serta rancang bangun dan perekayasaan.', 'Kearifan lokal yang dapat memberikan proteksi  masyarakat  ', 'Modal yang dikeluarkan untuk pengembangan produk iptek', 2, 42, 'Lingkungan tempat pemanfaatan produk Iptek'),
(43, 'Rendahnya kemampuan IPTEKS nasional dalam menghadapi perkembangan global', 'Rendahnya kontribusi IPTEKS nasional di sektor produksi  ', ' Lemahnya sinergi kebijakan IPTEKS', 'Kemerosotan moral di kalangan warga masyarakat.', 4, 43, 'Belum berkembangnya budaya IPTEKS di kalangan masyarakat'),
(44, 'Kearifan lokal yang terdapat di masyarakat', 'Keinginan untuk belajar pada semua lapisan masyarakat', 'Mitigasi bencana yang sedang digalakkan ', ' Penalaran objektif dan rasional', 1, 44, 'Pemahaman teknologi telah menjadi pengarah hidup manusia');

-- --------------------------------------------------------

--
-- Table structure for table `commentar`
--

CREATE TABLE `commentar` (
  `id` int(11) NOT NULL,
  `discussion_id` int(11) DEFAULT NULL,
  `comment` varchar(255) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `created_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `commentar`
--

INSERT INTO `commentar` (`id`, `discussion_id`, `comment`, `user_id`, `created_date`) VALUES
(1, 1, 'ini test ya', 1, '2023-06-19 05:04:48'),
(2, 1, 'lagi buat konent baru', 1, '2023-06-19 08:58:02'),
(3, 2, 'buat koment di topik baru ini', 1, '2023-06-19 09:53:06');

-- --------------------------------------------------------

--
-- Table structure for table `discussion`
--

CREATE TABLE `discussion` (
  `id` int(11) NOT NULL,
  `materi` varchar(255) NOT NULL,
  `posted_by` int(11) DEFAULT NULL,
  `create_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `actived` int(11) DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `discussion`
--

INSERT INTO `discussion` (`id`, `materi`, `posted_by`, `create_date`, `actived`) VALUES
(1, 'coba buat topik baru', 1, '2023-06-17 05:58:44', 0),
(2, 'ini topik yg lain ya', 1, '2023-06-19 09:44:06', 0);

-- --------------------------------------------------------

--
-- Table structure for table `exam`
--

CREATE TABLE `exam` (
  `id` int(11) NOT NULL,
  `name` varchar(150) NOT NULL,
  `materi_id` int(11) NOT NULL,
  `create_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `materi`
--

CREATE TABLE `materi` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `create_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `path` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `materi`
--

INSERT INTO `materi` (`id`, `name`, `create_date`, `path`) VALUES
(2, 'Politik dan Pemerintahan di Indonesia', '2023-06-20 03:25:40', 'https://www.youtube.com/watch?v=9qWauD4cumE'),
(3, 'Kegiatan Ekonomi, Uang dan Koperasi', '2023-06-20 03:25:40', 'https://www.youtube.com/watch?v=RRW2Cy2IR3U'),
(4, 'Pasar, Kesejahtraan dan Perdagangan Internasional', '2023-06-20 03:25:41', 'https://www.youtube.com/watch?v=CwZHQusxdSw'),
(5, 'Interaksi dalam Perkembangan IPTEK dan Masyarakat Global', '2023-06-19 10:02:35', 'https://www.youtube.com/watch?v=e38gK6qCMxA');

-- --------------------------------------------------------

--
-- Table structure for table `materi_assign`
--

CREATE TABLE `materi_assign` (
  `id` int(11) NOT NULL,
  `materi_id` int(11) NOT NULL,
  `account_id` int(11) NOT NULL,
  `create_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `materi_assign`
--

INSERT INTO `materi_assign` (`id`, `materi_id`, `account_id`, `create_date`) VALUES
(1, 1, 1, '2023-06-19 11:25:39'),
(2, 2, 1, '2023-06-19 11:25:42');

-- --------------------------------------------------------

--
-- Table structure for table `poin_exam`
--

CREATE TABLE `poin_exam` (
  `id` int(11) NOT NULL,
  `exam_id` int(11) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `transaction_number` varchar(100) DEFAULT NULL,
  `score` int(11) NOT NULL,
  `create_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `status` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `poin_exam_detail`
--

CREATE TABLE `poin_exam_detail` (
  `id` int(11) NOT NULL,
  `poin_exam_id` int(11) DEFAULT NULL,
  `answer` int(11) DEFAULT NULL,
  `istrue` tinyint(1) DEFAULT NULL,
  `created_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `answer_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `question`
--

CREATE TABLE `question` (
  `id` int(11) NOT NULL,
  `exam_id` int(11) DEFAULT NULL,
  `name` text NOT NULL,
  `create_by` int(11) NOT NULL,
  `create_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `question`
--

INSERT INTO `question` (`id`, `exam_id`, `name`, `create_by`, `create_date`) VALUES
(1, 2, 'Proses pembentukan dan pembagian kekuasaan dalam masyarakat yang antara lain berwujud proses pembuatan keputusan, khususnya dalam negara merupakan istilah menurut Kamus Besar Bahasa Indonesia untuk kata', 1, '2023-06-20 04:38:11'),
(2, 2, 'Siapakah tokoh yang mengemukakan pandangan, bahwa politik itu adalah kegiatan suatu bangsa yang bertujuan untuk membuat, mempertahankan, dan mengamandemen peraturan-peraturan umum yang mengatur kehidupannya, yang berarti tidak dapat terlepas dari gejala konflik dan kerja sama....', 1, '2023-06-20 04:38:11'),
(3, 2, 'Situasi pertetanggaan adalah salah satu faktor psikologis yang mempengaruhi Perilaku berpartisipasi dalam kegiatan politik, Situasi pertetanggaan adalah dikelompokkan pada faktor ….', 1, '2023-06-20 04:38:12'),
(4, 2, 'Pasal 7 UUD 1945 mengatur tentang ….', 1, '2023-06-20 04:38:12'),
(5, 2, 'Menurut isinya, hukum dibagi menjadi ….', 1, '2023-06-20 04:38:12'),
(6, 2, 'Diantara prinsip-prinsip dasar pemerintahan yang baik adalah…', 1, '2023-06-20 04:38:12'),
(7, 2, 'Bentuk pemerintahan Negara Indonesia setelah di proklamirkannya kemerdekaan adalah….', 1, '2023-06-20 04:38:12'),
(8, 2, 'Penanda awal berlakunya demokrasi terpimpin di Indonesia adalah….', 1, '2023-06-20 04:38:12'),
(9, 2, 'Pemberontakan yang dilakukan oleh Partai Komunis Indoesia di tahun 1965 dikenal dengan istilah ….', 1, '2023-06-20 04:38:12'),
(10, 2, 'Pada tahun 1973, Presiden Soeharto memerintahkan untuk pelaksanaan penyederhanaan partai dan golongan, partai-partai dan golongan dimaksud adalah ….', 1, '2023-06-20 04:38:12'),
(11, 2, 'Jumlah partai nasional kontestan pemilu 2019 adalah sebanyak….', 1, '2023-06-20 04:38:12'),
(12, 3, ' Ilmu yang mempelajari bagaimana manusia membuat pilihan- pilihan untuk menggunakan sumber daya yang terbatas dalam rangka memenuhi kebutuhan dan keinginan yang tidak terbatas merupakan definisi dari ….', 1, '2023-06-20 04:38:12'),
(13, 3, 'Rumusan masalah ekonomi modern lebih spesifik yang dikemukakan oleh Sutatmi adalah :', 1, '2023-06-20 04:38:12'),
(14, 3, 'Tindakan ekonomis yang dilakukan manusia didasari oleh apa yang disebut dengan prinsip ekonomi, yaitu ….', 1, '2023-06-20 04:38:12'),
(15, 3, 'Pada dasarnya hanya ada empat hal yang dapat dikategorikan sebagai kebutuhan untuk dapat bertahan hidup, kecuali ….', 1, '2023-06-20 04:38:12'),
(16, 3, 'Ciri manusia yang melakukan tindakan dengan dilandasi oleh prinsip ekonomi, adalah….', 1, '2023-06-20 04:38:12'),
(17, 3, 'Memenuhi kebutuhan manusia dalam mencapai kemakmuran adalah tujuan dari …', 1, '2023-06-20 04:38:12'),
(18, 3, 'Nilai guna barang yang dihasilkan atau bertambah akibat kegiatan produksi dapat dikategorikan sebagai berikut…', 1, '2023-06-20 04:38:12'),
(19, 3, 'Efektifitas atau tingkat keberhasilan sebuah kegiatan produksi, baik kegiatan produksi barang maupun jasa, sangat tergantung dari kualitas dari faktor produksi, yaitu …', 1, '2023-06-20 04:38:12'),
(20, 3, 'Memberi Informasi adalah salah satu fungsi distribusi dari kelompok …', 1, '2023-06-20 04:38:12'),
(21, 3, 'Kebutuhan tersier adalah barang-barang yang disamping berfungsi untuk membantu kehidupan manusia namun juga berfungsi sebagai … ', 1, '2023-06-20 04:38:12'),
(22, 3, 'Beberapa faktor yang menentukan besar kecilnya pengeluaran konsumsi yang dilakukan konsumen, diantaranya ….', 1, '2023-06-20 04:38:12'),
(23, 4, 'Regulasi tentang Penataan dan Pembinaan Pasar Tradisional, Pusat Perbelanjaan dan Toko Modern adalah terdapat pada  ….', 1, '2023-06-20 04:38:12'),
(24, 4, 'Menurut manajemennya, pasar dapat dibedakan menjadi...', 1, '2023-06-20 04:38:12'),
(25, 4, 'Pasar persaingan sempurna dan Pasar persaingan tidak sempurna adalah pengelompokan pasar berdasarkan ….', 1, '2023-06-20 04:38:12'),
(26, 4, '2 cara yang dapat digunakan untuk mengukur kesejahteraan materi atau Indikator Kesejahteraan adalah ….', 1, '2023-06-20 04:38:12'),
(27, 4, 'Brata mengemukakan bahwa kemampuan penduduk dalam mengelola sumber-sumber pertumbuhan ekonomi ditentukan oleh ….', 1, '2023-06-20 04:38:12'),
(28, 4, 'Dampak negatif dari perdagangan internasional adalah…', 1, '2023-06-20 04:38:13'),
(29, 4, 'Beberapa hal yang tidak terjadi ketika negara terlibat dalam perdagangan internasional adalah ….', 1, '2023-06-20 04:38:13'),
(30, 4, 'Nilai mata uang yang dimiliki sebuah negara yang dinyatakan dengan nilai mata uang negara yang lain disebut dengan ', 1, '2023-06-20 04:38:13'),
(31, 4, 'Nilai tukar dolar US saat ini terhadap rupiah adalah 1 USD = 14.440 IDR. Jika kita punya uang Rp 100.000.000. Setelah ditukar, mendapatkan uang $ sebesar….', 1, '2023-06-20 04:38:13'),
(32, 4, 'Suatu konsep perekonomian di era ekonomi baru yang mengintensifkan informasi dan kreativitas, dengan mengedepankan ide dan berbagai pengetahuan dari sumber daya manusia itu sendiri disebut dengan ….', 1, '2023-06-20 04:38:13'),
(33, 4, ' Manfaat yang dapat diperoleh dengan berkembangannya bidang ekonomi kreatif ini, kecuali …', 1, '2023-06-20 04:38:13'),
(34, 5, 'Melalui pikiran dan pikirannya agar menghasilkan pengetahuan yang bermakna sebagai seperangkat pengetahuan yang tersusun dalam suatu sistem aturan tertentu. Pengetahuan yang terorganisir ini disebut ….', 1, '2023-06-20 04:38:13'),
(35, 5, 'Teknologi adalah istilah lain untuk', 1, '2023-06-20 04:38:13'),
(36, 5, ' Membantu manusia mempermudah kegiatan hidup, lancar, efisien, dan efektif, serta menjadikan hidupnya lebih bermakna dan efektif, hal ini adalah…', 1, '2023-06-20 04:38:13'),
(37, 5, 'Dalam antropologi, terminologi atau pengertian ilmu pengetahuan dan teknologi sering digunakan untuk menyebut hubungan antara ….', 1, '2023-06-20 04:38:13'),
(38, 5, 'Dalam penggunaan perangkat teknologi oleh manusia, ilmu pengetahuan digunakan untuk …', 1, '2023-06-20 04:38:13'),
(39, 5, 'Suatu keadaan yang tidak seharusnya terjadi ketika semakin tinggi penguasaan atau semakin berkembangnya IPTEKS, akan terwujud…', 1, '2023-06-20 04:38:13'),
(40, 5, 'Diantara manfaat perkembangan iptek di Indonesia pada bidang ekonomi adalah…', 1, '2023-06-20 04:38:13'),
(41, 5, 'Kemajuan teknologi komunikasi yang cepat dapat mempermudah komunikasi antar manusia dari suatu tempat ke tempat yang lain adalah salah satu manfaat perkembangan IPTek di bidang', 1, '2023-06-20 04:38:13'),
(42, 5, 'Faktor yang paling menentukan dalam hal penguasaan IPTEKS adalah….', 1, '2023-06-20 04:38:13'),
(43, 5, 'Berikut adalah tantangan pengembangan iptek di indonesia, kecuali…', 1, '2023-06-20 04:38:13'),
(44, 5, 'Proteksi  masyarakat  untuk  tetap  bertahan  di  tengah  perubahan  sosial yang  terjadi karena perkembangan iptek dewasa ini di Indonesia bisa diperoleh dari…', 1, '2023-06-20 04:38:13');

-- --------------------------------------------------------

--
-- Table structure for table `usage_history`
--

CREATE TABLE `usage_history` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `type` varchar(100) NOT NULL,
  `description` varchar(150) DEFAULT NULL,
  `create_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `usage_history`
--

INSERT INTO `usage_history` (`id`, `user_id`, `type`, `description`, `create_date`) VALUES
(1, 1, 'ON_LOGIN', 'Ketika login, Model: 33, Version: 13, Version Release: SM-A525F', '2023-06-17 05:46:53'),
(2, 1, 'OPEN_SUB_MATERI', 'Ketika membuka sub menu, Politik dan Pemerintahan di Indonesia', '2023-06-17 05:48:28'),
(3, 1, 'DISCUSSION', 'Ketika membuka menu diskusi', '2023-06-17 05:53:51'),
(4, 1, 'DISCUSSION', 'Ketika membuka menu diskusi', '2023-06-17 05:55:55'),
(5, 1, 'DISCUSSION', 'Ketika membuka menu diskusi', '2023-06-17 05:58:18'),
(6, 1, 'DISCUSSION', 'Ketika membuka menu diskusi', '2023-06-17 05:58:44'),
(7, 1, 'DISCUSSION', 'Ketika membuka menu diskusi', '2023-06-17 06:01:09'),
(8, 1, 'DISCUSSION', 'Ketika membuka menu diskusi', '2023-06-19 03:07:00'),
(9, 1, 'DISCUSSION', 'Ketika membuka menu diskusi', '2023-06-19 03:23:13'),
(10, 1, 'DISCUSSION', 'Ketika membuka menu diskusi', '2023-06-19 04:45:30'),
(11, 1, 'DISCUSSION', 'Ketika membuka menu diskusi', '2023-06-19 04:46:16'),
(12, 1, 'DISCUSSION', 'Ketika membuka menu diskusi', '2023-06-19 05:01:39'),
(13, 1, 'DISCUSSION', 'Ketika membuka menu diskusi', '2023-06-19 05:04:35'),
(14, 1, 'DISCUSSION', 'Ketika membuka menu diskusi', '2023-06-19 05:07:13'),
(15, 1, 'DISCUSSION', 'Ketika membuka menu diskusi', '2023-06-19 08:57:46'),
(16, 1, 'DISCUSSION', 'Ketika membuka menu diskusi', '2023-06-19 09:34:16'),
(17, 1, 'DISCUSSION', 'Ketika membuka menu diskusi', '2023-06-19 09:42:17'),
(18, 1, 'DISCUSSION', 'Ketika membuka menu diskusi', '2023-06-19 09:43:21'),
(19, 1, 'DISCUSSION', 'Ketika membuka menu diskusi', '2023-06-19 09:43:37'),
(20, 1, 'DISCUSSION', 'Ketika membuka menu diskusi', '2023-06-19 09:44:13'),
(21, 1, 'DISCUSSION', 'Ketika membuka menu diskusi', '2023-06-19 09:44:46'),
(22, 1, 'DISCUSSION', 'Ketika membuka menu diskusi', '2023-06-19 09:52:40'),
(23, 1, 'DISCUSSION', 'Ketika membuka menu diskusi', '2023-06-19 09:53:19');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `accounts`
--
ALTER TABLE `accounts`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `answer`
--
ALTER TABLE `answer`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `commentar`
--
ALTER TABLE `commentar`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `discussion`
--
ALTER TABLE `discussion`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `exam`
--
ALTER TABLE `exam`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `materi`
--
ALTER TABLE `materi`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `materi_assign`
--
ALTER TABLE `materi_assign`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `poin_exam`
--
ALTER TABLE `poin_exam`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `poin_exam_detail`
--
ALTER TABLE `poin_exam_detail`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `question`
--
ALTER TABLE `question`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `usage_history`
--
ALTER TABLE `usage_history`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `accounts`
--
ALTER TABLE `accounts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `answer`
--
ALTER TABLE `answer`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=45;
--
-- AUTO_INCREMENT for table `commentar`
--
ALTER TABLE `commentar`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT for table `discussion`
--
ALTER TABLE `discussion`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `exam`
--
ALTER TABLE `exam`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `materi`
--
ALTER TABLE `materi`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
--
-- AUTO_INCREMENT for table `materi_assign`
--
ALTER TABLE `materi_assign`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT for table `poin_exam`
--
ALTER TABLE `poin_exam`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `poin_exam_detail`
--
ALTER TABLE `poin_exam_detail`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `question`
--
ALTER TABLE `question`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=45;
--
-- AUTO_INCREMENT for table `usage_history`
--
ALTER TABLE `usage_history`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
