import React, { useEffect } from "react";
import { Box, Tabs, Tab } from "@mui/material";

const TabContainer = ({ value, handleChange, tabs }) => {
  useEffect(() => {
    console.log(`Current Tab: ${value}`);
  }, [value]);

  return (
    <div style={{ marginLeft: "970px", marginTop: "30px" }}>
      <Box
        ml={4}
        p={2}
        sx={{
          width: "500px",
          backgroundColor: "#f9f9f9",
          borderRadius: "8px",
          marginTop: "-400px",
          height: "560px",
        }}
      >
        <Tabs
          value={value}
          onChange={handleChange}
          textColor="secondary"
          indicatorColor="secondary"
          aria-label="tabs example"
        >
          {tabs.map((tab, index) => (
            <Tab key={index} value={tab.value} label={tab.label} />
          ))}
        </Tabs>

        {/* Scrollable content area */}
        <div
          style={{
            height: "470px",
            overflowY: "auto",
            marginTop: "16px",
            padding: "10px",
            backgroundColor: "#fff",
            borderRadius: "4px",
            overflowX: "hidden", // Prevent horizontal scroll
          }}
        >
          {tabs.map((tab, index) => (
            <div key={index} hidden={value !== tab.value}>
              {tab.content}
            </div>
          ))}
        </div>
      </Box>
    </div>
  );
};

export default TabContainer;
