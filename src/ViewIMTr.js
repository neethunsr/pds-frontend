import {
  TextField,
  Card,
  CardContent,
  Typography,
  IconButton,
} from "@mui/material";
import { useState, useEffect } from "react";
import Header from "./components/Header";
import { toast } from "react-toastify";
import firebase from "./firebase";

function ViewIMTransaction() {
  const pages = [
    { name: "HOME", link: "/", id: 0 },
    { name: "SIGN IN", link: "/signin", id: 1 },
    { name: "REGISTER", link: "/register", id: 2 },
    { name: "ABOUT US", link: "/about", id: 3 },
    { name: "VIEW ALLOCATIONS", link: "/viewim", id: 4 },
  ];
  const [allocations, setAllocations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchShopId, setSearchShopId] = useState("");
  const ref = firebase.firestore().collection("ration_allocations");

  // Fetch allocations from Firestore
  const fetchAllocations = async () => {
    setLoading(true);
    try {
      const snapshot = await ref.orderBy("timestamp", "desc").get();
      const allocationData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setAllocations(allocationData);
    } catch (error) {
      console.error("Error fetching allocations:", error);
      toast.error("Failed to fetch allocations");
    } finally {
      setLoading(false);
    }
  };

  // Load allocations on component mount
  useEffect(() => {
    fetchAllocations();
  }, []);

  return (
    <>
      {" "}
      <Header pages={pages} log={true} />
      <h2 style={{ marginTop: "70px" }}>VIEW ALLOCATIONS</h2>
      <div className="w-responsive text-center mx-auto p-5 mt-3 mb-5">
        {/* Display existing allocations */}
        <div
          style={{
            marginTop: "30px",
            maxHeight: "300px",
            overflowY: "auto",
          }}
        >
          <Typography
            variant="h6"
            style={{ marginBottom: "15px", color: "#17396B" }}
          >
            Recent Allocations
          </Typography>
          <TextField
            label="Search by Shop ID"
            variant="outlined"
            size="small"
            value={searchShopId}
            onChange={(e) => setSearchShopId(e.target.value)}
            style={{ marginBottom: "15px", width: 300 }}
          />
          {allocations.filter(
            (allocation) =>
              searchShopId === "" ||
              String(allocation.shopNo).includes(searchShopId)
          ).length === 0 ? (
            <Typography
              variant="body2"
              style={{ textAlign: "center", color: "#666" }}
            >
              No allocations found
            </Typography>
          ) : (
            allocations
              .filter(
                (allocation) =>
                  searchShopId === "" ||
                  String(allocation.shopNo).includes(searchShopId)
              )
              .map((allocation) => (
                <Card
                  key={allocation.id}
                  style={{
                    marginBottom: "10px",
                    width: "100%",
                    // maxWidth: "600px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    padding: "10px",
                    border: "1px solid #e0e0e0",
                    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                  }}
                >
                  <CardContent
                    style={{ padding: "12px", position: "relative" }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                      }}
                    >
                      <div>
                        <Typography
                          variant="subtitle2"
                          style={{ fontWeight: "bold", color: "#17396B" }}
                        >
                          Shop No: {allocation.shopNo}
                        </Typography>
                        <Typography variant="body2" style={{ margin: "5px 0" }}>
                          <strong>Wheat:</strong> {allocation.wheat}kg |
                          <strong> Rice:</strong> {allocation.rice}kg |
                          <strong> Kerosene:</strong> {allocation.kerosene}L
                        </Typography>
                        <Typography variant="caption" style={{ color: "#666" }}>
                          Date: {allocation.date} | By: {allocation.allocatedBy}
                        </Typography>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
          )}
        </div>
      </div>
    </>
  );
}

export default ViewIMTransaction;
