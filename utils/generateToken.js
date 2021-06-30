import jwt from 'jsonwebtoken'

const generationToken = (id) => {
    return jwt.sign ( {id}, process.env.JWT_SECRET, {
        expiresIn:"30d",
    })
}


export default generationToken