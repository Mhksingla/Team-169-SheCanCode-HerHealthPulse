"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const schemesData = [
  {
    
    id: 1,
    name: "Pradhan Mantri Bhartiya Janaushadhi Pariyojana (PMBJP)",
    category: "Financial Aid & Subsidized Products",
    description:
      "Under this scheme, the government offers 'Jan Aushadhi Suvidha' sanitary napkins at a nominal cost of ₹1 per pad across more than 6,300 Pradhan Mantri Bhartiya Janaushadhi Kendras nationwide.",
    link: "https://www-myscheme-gov-in.translate.goog/schemes/pmbjp?_x_tr_sl=en&_x_tr_tl=hi&_x_tr_hl=hi&_x_tr_pto=wa&_x_tr_hist=true"
  },
  {
    
    id: 2,
    name: "Free Pads for India",
    category: "Financial Aid & Subsidized Products",
    description:
      "Founded by three non-menstruators, this NGO works to eradicate period poverty by providing free sanitary pads and menstrual health education to those in need.",
    link: "https://freepadsforindia.org/?utm_source=chatgpt.com"
  },
  {
    
    id: 3,
    name: "Menstrual Hygiene Scheme (MHS)",
    category: "Financial Aid & Subsidized Products",
    description:
      "Implemented by the Ministry of Health and Family Welfare, this scheme focuses on promoting menstrual hygiene among adolescent girls aged 10-19 years by providing subsidized sanitary pads and raising awareness..",
    link: "https://nhm.gov.in/index1.php?lang=1&level=3&sublinkid=1021&lid=391"
  },
  {
    
    id: 4,
    name: "Beti Bachao Beti Padhao",
    category: "Education",
    description:
      "A government scheme promoting education and welfare for girl children.",
    link: "https://mon.nic.in/scheme/beti-bachao-beti-padhao/"
  },
  {
    id: 5,
    name: "Pradhan Mantri Matru Vandana Yojana",
    category: "Maternity Benefits",
    description:
      "A maternity benefit program for pregnant and lactating women.",
    link: "https://wcd.delhi.gov.in/wcd/pradhan-mantri-matru-vandana-yojana-pmmvy"
  },
  {
    id: 6,
    name: "Sukanya Samriddhi Yojana",
    category: "Financial Aid",
    description:
      "A savings scheme for the girl child's future education and marriage.",
    link: "https://www.nsiindia.gov.in/(S(tkg4lbvmki0d4yyacfevlc55))/InternalPage.aspx?Id_Pk=89"
  },
  {
    id: 7,
    name: "Janani Suraksha Yojana",
    category: "Healthcare",
    description:
      "A scheme aimed at reducing maternal and neonatal mortality.",
    link: "https://nhm.gov.in/index1.php?lang=1&level=3&lid=309&sublinkid=841"
  }
];

export default function GovtSchemes() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [filteredSchemes, setFilteredSchemes] = useState(schemesData);

  useEffect(() => {
    let filtered = schemesData.filter(
      (scheme) =>
        (category === "All" || scheme.category === category) &&
        scheme.name.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredSchemes(filtered);
  }, [search, category]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-100 to-white p-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto bg-white p-6 shadow-lg rounded-lg"
      >
        <h2 className="text-3xl font-bold text-pink-700 text-center">Government Schemes for Women</h2>
        <p className="text-gray-700 text-center mb-6">Find beneficial schemes for education, health, and financial support.</p>

        {/* Search & Category Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <input
            type="text"
            placeholder="Search for schemes..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full md:w-2/3 p-3 border rounded-lg focus:ring-2 focus:ring-pink-500"
          />
          <select
            className="w-full md:w-1/3 p-3 border rounded-lg focus:ring-2 focus:ring-pink-500"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="All">All Categories</option>
            <option value="Financial Aid & Subsidized Products">Financial Aid & Subsidized Products</option>
            <option value="Education">Education</option>
            <option value="Maternity Benefits">Maternity Benefits</option>
            <option value="Financial Aid">Financial Aid</option>
            <option value="Healthcare">Healthcare</option>
          </select>
        </div>

        {/* Display Schemes */}
        <div className="grid gap-6">
          {filteredSchemes.length > 0 ? (
            filteredSchemes.map((scheme) => (
              <motion.div
                key={scheme.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="p-4 border rounded-lg shadow hover:shadow-xl transition"
              >
                <h3 className="text-xl font-semibold text-pink-600">{scheme.name}</h3>
                <p className="text-gray-700 mt-2">{scheme.description}</p>
                <a
                  href={scheme.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-3 px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-700 transition"
                >
                  Learn More
                </a>
              </motion.div>
            ))
          ) : (
            <p className="text-gray-600 text-center">No schemes found.</p>
          )}
        </div>
      </motion.div>
    </div>
  );
}
