module.exports = function(application) {
    application.get('/api/array_vazio', (req, res) => {
      // Fake array para listar tabela em branco
      var query = req.query;
      var draw = query.draw || 1;
      var tableData = {
        draw: draw,
        recordsTotal: 0,
        recordsFiltered: 0,
      };
      tableData.data = [];
      res.status(200).json(tableData);
    });
  }