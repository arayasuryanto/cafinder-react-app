// Detailed data for a single cafe page
const singleCafeData = {
  id: "sb-1",
  name: "Filgud Coffee",
  region: "Surabaya Selatan",
  fullAddress: "Jl. Mayjen Sungkono No. 89, Surabaya Selatan",
  coordinates: {
    lat: -7.2874,
    lng: 112.6732
  },
  contactInfo: {
    phone: "+62 813 5789 1234",
    email: "gwalk@forecoffee.com",
    website: "https://forecoffee.com",
    socialMedia: {
      instagram: "@forecoffeeid",
      facebook: "Fore Coffee Indonesia"
    }
  },
  rating: 4.9,
  totalReviews: 10,
  priceRange: "$$",
  images: [
    {
      id: 1,
      url: "https://images.unsplash.com/photo-1521017432531-fbd92d768814?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
      caption: "Interior & Working Space"
    },
    {
      id: 2,
      url: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
      caption: "Barista Bar"
    },
    {
      id: 3,
      url: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
      caption: "Coffee Service"
    },
    {
      id: 4,
      url: "https://images.unsplash.com/photo-1507914997799-d84c6293f6a5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
      caption: "Coffee & Pastry Selection"
    },
    {
      id: 5,
      url: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
      caption: "Exterior View"
    }
  ],
  tags: ["Working Space", "Free WiFi", "Modern", "Specialty Coffee", "Cozy", "Power Outlets"],
  description: "Fore Coffee G-Walk adalah cabang premium dari jaringan Fore Coffee yang menawarkan pengalaman menikmati kopi berkualitas dalam suasana modern dan nyaman. Terletak di area G-Walk yang strategis, kafe ini menjadi tempat favorit bagi para pekerja remote, mahasiswa, dan pecinta kopi yang mencari tempat ideal untuk bekerja atau bertemu dengan kolega.",
  aboutDetails: [
    "Fore Coffee G-Walk menyajikan berbagai jenis kopi specialty dari biji pilihan yang di-roasting dengan sempurna. Kafe ini memiliki interior modern dengan pencahayaan yang baik, ideal untuk bekerja atau meeting.",
    "Selain kopi, kafe ini juga menawarkan berbagai pilihan pastry, cake, dan makanan ringan yang cocok untuk menemani waktu kerja atau sekedar bersantai. Koneksi internet cepat dan stabil serta banyaknya colokan listrik menjadikan tempat ini pilihan utama untuk remote working.",
    "Staf yang ramah dan profesional siap memberikan rekomendasi kopi sesuai dengan preferensi pelanggan, menjadikan setiap kunjungan menjadi pengalaman yang personal dan menyenangkan."
  ],
  features: [
    "Free WiFi",
    "Power Outlets",
    "Air Conditioning",
    "Non-Smoking Area",
    "Wheelchair Accessible",
    "Outdoor Seating",
    "Takeaway Available"
  ],
  openingHours: {
    Monday: { open: "08:00", close: "21:00" },
    Tuesday: { open: "08:00", close: "21:00" },
    Wednesday: { open: "08:00", close: "21:00" },
    Thursday: { open: "08:00", close: "21:00" },
    Friday: { open: "08:00", close: "22:00" },
    Saturday: { open: "10:00", close: "22:00" },
    Sunday: { open: "10:00", close: "20:00" }
  },
  ratings: {
    overall: 4.7,
    categories: {
      coffee: 4.9,
      food: 4.5,
      atmosphere: 4.8,
      service: 4.6,
      value: 4.5,
      wifi: 4.7
    }
  },
  reviews: [
    {
      id: 1,
      user: {
        name: "Ahmad Firdaus",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=150&q=80",
        reviewCount: 12
      },
      rating: 5,
      date: "August 15, 2023",
      text: "Saya sering bekerja remote dari Fore Coffee G-Walk karena tempatnya nyaman, WiFi kencang dan banyak stop kontak. Kopinya juga enak dan konsisten kualitasnya. Staff ramah dan sangat membantu. Highly recommended!"
    },
    {
      id: 2,
      user: {
        name: "Dina Safira",
        image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=150&q=80",
        reviewCount: 8
      },
      rating: 4,
      date: "July 23, 2023",
      text: "Kopi dan pastry-nya enak, tempatnya juga instagramable. Saya suka interior dan suasananya yang tenang. Sayangnya kadang ramai saat jam makan siang jadi agak susah dapat tempat duduk. Tetapi secara keseluruhan saya suka dan akan kembali lagi."
    },
    {
      id: 3,
      user: {
        name: "Rendi Pratama",
        image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=150&q=80",
        reviewCount: 15
      },
      rating: 5,
      date: "June 8, 2023",
      text: "Fore Coffee G-Walk punya kualitas kopi yang sangat baik. Espresso dan pour over-nya juara! Tempatnya juga nyaman untuk meeting bisnis, saya sering mengadakan pertemuan dengan klien di sini. Area outdoor-nya juga menarik, apalagi saat sore hari. Pasti akan kembali lagi."
    }
  ],
  nearbyAttractions: [
    {
      name: "G-Walk Food Street",
      distance: "100m",
      type: "Food Court"
    },
    {
      name: "Ciputra Waterpark",
      distance: "2.5km",
      type: "Entertainment"
    },
    {
      name: "Pakuwon Mall",
      distance: "3.8km",
      type: "Shopping Mall"
    }
  ],
  popularTimes: {
    weekday: {
      morning: "medium", // 7-11
      midday: "high",    // 11-2
      afternoon: "medium", // 2-5
      evening: "high"    // 5-9
    },
    weekend: {
      morning: "low",    // 7-11
      midday: "high",    // 11-2
      afternoon: "high", // 2-5
      evening: "high"    // 5-9
    }
  }
};

export default singleCafeData;