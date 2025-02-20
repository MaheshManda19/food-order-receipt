export const fetchReceipts = async () => {
    const url = "http://31.201.58.220:3000/email/api/receipts";
    const token = "2342975cd6cbd2d3361e2ae40c5238f4525ebf4d";
  
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Authorization": `Token ${token}`,
          "Content-Type": "application/json"
        }
      });
  
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
  
      const data = await response.json();
      console.log("Receipts Data:", data);
      return data;
    } catch (error) {
      console.error("Failed to fetch receipts:", error);
    }
  };
  
  fetchReceipts();
  