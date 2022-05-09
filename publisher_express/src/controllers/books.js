const getAll = (req, res, next) => {
  res.json({ message: "getAll books" });
};

const getAllLookup = (req, res, next) => {
  res.json({ message: "getAllLookup books" });
};

const getById = (req, res, next) => {
  res.json({ message: "getById books" });
};

const create = (req, res, next) => {
  res.json({ message: "create books" });
};

const updateById = (req, res, next) => {
  res.json({ message: "updateById books" });
};

const deleteById = (req, res, next) => {
  res.json({ message: "deleteById books" });
};

module.exports = {
  getAll,
  getAllLookup,
  getById,
  create,
  updateById,
  deleteById,
};
