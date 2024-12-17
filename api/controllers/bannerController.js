
const Banner = require('../models/bannerModel');

exports.getBanners = (req, res) => {
  Banner.getAll((err, banners) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(200).json(banners);
  });
};

exports.addBanners = (req, res) => {
  const bannerData = req.body;
  Banner.add(bannerData, (err, banner) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json(banner);
  });
};

exports.removeBanner = (req, res) => {
  const id = req.params.id;
  Banner.remove(id, (err, banner) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json(banner);
  });

}



