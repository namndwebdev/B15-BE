const express = require('express')
const router = express.Router()
const { createErrorMiddleware } = require('@middlewares/error')
const createError = require('http-errors')
const { getAllUser, getDetailUser, createUser, updateUser, deleteUser } = require('@services/user')
const { validateQueryPaging } = require('@helper/validateData')

// Get all
router.get("/", async (req, res, next) => {
  try {
    const {page, limit} = validateQueryPaging(req.query)
    const result = await getAllUser(page, limit)
    return res.json(result)
  } catch(error) {
    next(createError(500, error))
  }  
})

// Get details
router.get("/:id", async (req, res, next) => {
  try {
    const result = await getDetailUser(req.params.id)
    const {_id, name, email, role} = result
    return res.json({ _id, name, email, role})
  } catch(error) {
    next(createError(500, error))
  }
})

// Create user
router.post("/", async(req, res, next) => {
  try {
    const result = await createUser(req.user.role, req.body)
    return res.json({
      _id: result._id,
      name: result.name,
      email: result.email,
      role: result.role
    })
  } catch(error) {
    next(createError(500, error))
  }
})

// Update user
router.put("/:id", async(req, res, next) => {
  try {
    const result = await updateUser(req.params.id, req.user.role, req.body)
    return res.json(result)
  } catch(error) {
    next(createError(500, error))
  }
})

// Delete user
router.delete("/:id", async(req, res, next) => {
  try {
    const result = await deleteUser(req.params.id)
    return res.json(result)
  } catch(error) {
    next(createError(500, error))
  }
})

let handleError = createErrorMiddleware('Admin/Users')
router.use(handleError)

module.exports = router