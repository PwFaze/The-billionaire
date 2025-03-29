
export const getStockPriceA = async (ticker: string): Promise<{ price: number, trend: string }> => {
     const basePrice = 100.0;
    
     // random rate between -5% to +5% 
     const changeRate = (Math.random() * 10 - 5) / 100;
     
     // cal new price
     const newPrice = basePrice * (1 + changeRate);

     // trend
     const trend = changeRate >= 0 ? 'up' : 'down';
     
     return { price: parseFloat(newPrice.toFixed(2)), trend };
}