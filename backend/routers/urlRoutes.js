const express = require("express");
const router = express.Router();
const axios = require("axios");
const cheerio = require("cheerio");
const urlModels = require("../models/urlModels");

router.post("/api/url", async (req, res) => {
  console.log("yolo", req.body);
  const { url } = req.body;

  try {
    // Fetch the website content
    const response = await axios.get(url);
    const html = response.data;

    // Parse the HTML using Cheerio
    const $ = cheerio.load(html);
    const text = $("body").text();

    // Count the words
    const words = text.split(" ");
    const wordCount = words.length;

    // Fetch media URLs and details
    const mediaUrls = [];
    $("img").each((index, element) => {
      const src = $(element).attr("src");
      mediaUrls.push(src);
    });
    $("video").each((index, element) => {
      const src = $(element).attr("src");
      mediaUrls.push(src);
    });

    // Fetch web links
    const webLinks = [];
    $("a").each((index, element) => {
      const href = $(element).attr("href");
      webLinks.push(href);
    });

    // Store the word count in the database
    const newWordCount = new urlModels({
      domain: url,
      wordCount,
      mediaUrls,
      webLinks,
      favourites: false,
    });
    await newWordCount.save();

    res.json({ wordCount, mediaUrls, webLinks });
  } catch (error) {
    console.error("Error checking word count:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/api/url", async (req, res) => {
  const getTodo = await urlModels.find({});
  res.status(200).json(getTodo);
});

router.put("/api/url/:id", async (req, res) => {
  try {
    const todo = await urlModels.findById(req.params.id);
    if (!todo) {
      return res.status(404).json({ error: "Todo not found" });
    }

    todo.favourites = !todo.favourites; // Toggle the favourites field

    const updatedTodo = await todo.save();

    res.json({ message: "Todo updated", todo: updatedTodo });
  } catch (error) {
    console.error("Error updating todo:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.delete("/api/url/:id", async (req, res) => {
  const deleteTodo = await urlModels.findByIdAndDelete(req.params.id);
  res.json("deleted");
});

module.exports = router;
