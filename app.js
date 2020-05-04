const fs = require('fs');
const express = require('express');

const app = express();
const port = 3000;

// middleware : a function that modifies the incoming data
app.use(express.json());

/**Custorm middleware */
app.use((req, res, next) => {
  console.log("hey from middleware")
  next()
})

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString()
  next();
})

/*Read file */
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);


const getAllTours = (req, res) => {
  res.status(200).json({
    status: 200,
    posted: req.requestTime,
    result: tours.length,
    data: {
      tours,
    },
  });
}
const getTour = (req, res) => {
  console.log(req.params);
  const id = req.params.id * 1;

  const tour = tours.find((el) => el.id === id);
  // if (id > tours.length) {
  if (!tour) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid id',
    });
  }
  console.log(tour);
  res.status(200).json({
    status: 'success',
    data: {
      tour,
    },
  });
}
const createTour = (req, res) => {
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);
  tours.push(newTour);
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        status: 'success',
        data: {
          tour: newTour,
        },
      });
    }
  );
}
const updateTour = (req, res) => {
  if (req.params.id * 1 > tours.length) {
    res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }
  res.status(200).json({
    status: 'success',
    data: {
      tour: '<Update tour here...>',
    },
  });
}
const deleteTour = (req, res) => {
  if (req.params.id * 1 > tours.length) {
    res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }
  res.status(204).json({
    status: 'success',
    data: {
      tour: null,
    },
  });
}

/**Users route handlers**/
const getAllUsers = (req, res) => {
  res.status(500).json({
    status: 500,
    message: 'This route is not yet implemented'
  })
}

const getUser = (req, res) => {
  res.status(500).json({
    status: 500,
    message: 'This route is not available'
  })
}

const createUser = (req, res) => {
  res.status(500).json({
    status: 500,
    message: 'This route is not available'
  })
}

const updateUser = (req, res) => {
  res.status(500).json({
    status: 500,
    message: 'This route is not available'
  })
}
const deleteUser = (req, res) => {
  res.status(500).json({
    status: 500,
    message: 'This route is not available'
  })
}

const tourRouter = express.Router()
const userRouter = express.Router()


tourRouter
  .route('/')
  .get(getAllTours)
  .post(createTour)


tourRouter
  .route('/:id')
  .get(getTour)
  .patch(updateTour)
  .delete(deleteTour)

/**Users middleware**/


userRouter
  .route('/')
  .get(getAllUsers)
  .post(createUser)

userRouter
  .route('/:id')
  .get(getUser)
  .patch(updateUser)
  .delete(deleteUser)

app.use('/api/v1/tours', tourRouter)
app.use('/api/v1/users', userRouter)


app.listen(port, () => console.log('App running on port ' + port));
