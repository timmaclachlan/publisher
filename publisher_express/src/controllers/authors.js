const getAll = (req, res, next) => {
  res.json({ message: "getAll authors" });
};

const getAllLookup = (req, res, next) => {
  res.json({ message: "getAllLookup authors" });
};

const getById = (req, res, next) => {
  res.json({ message: "getById authors" });
};

const create = (req, res, next) => {
  res.json({ message: "create authors" });
};

const updateById = (req, res, next) => {
  res.json({ message: "updateById authors" });
};

const deleteById = (req, res, next) => {
  res.json({ message: "deleteById authors" });
};

module.exports = {
  getAll,
  getAllLookup,
  getById,
  create,
  updateById,
  deleteById,
};
