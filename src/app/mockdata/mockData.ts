export const concertData = {
    id: "concert-001",
    name: "动漫音乐盛典2023",
    date: "2023-12-15",
    time: "19:00",
    venue: "东京巨蛋",
    address: "1-3-61 Koraku, Bunkyo City, Tokyo 112-0004, Japan",
};

export const ticketTypes = [
    { id: 1, name: "VIP", price: 3680, quantity: 50 },
    { id: 2, name: "Gold", price: 2780, quantity: 100 },
    { id: 3, name: "Silver", price: 2250, quantity: 200 },
    { id: 4, name: "General", price: 1980, quantity: 500 },
    { id: 5, name: "Regular", price: 1680, quantity: 1000 },
    { id: 6, name: "Economy", price: 1360, quantity: 1500 },
    { id: 7, name: "Back Row", price: 1099, quantity: 2000 },
];

export const mockOrderData = {
    id: "order-12345",
    concertId: "concert-001",
    date: "2023-12-15",
    total: 5680,
    tickets: [
        { id: "T001", type: "VIP", price: 3680, seat: "A1" },
        { id: "T002", name: "General", price: 1980, seat: "B5" },
    ],
    merchandise: [
        { id: 1, name: "演唱会T恤", price: 250, quantity: 1, isCharity: false },
        { id: 3, name: "限量版徽章", price: 80, quantity: 1, isCharity: true },
    ],
    concertData: {
        id: "concert-001",
        name: "动漫音乐盛典2023",
        date: "2023-12-15",
        time: "19:00",
        venue: "东京巨蛋",
        address: "1-3-61 Koraku, Bunkyo City, Tokyo 112-0004, Japan",
    },
};
