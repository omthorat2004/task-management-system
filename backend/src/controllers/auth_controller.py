from fastapi import APIRouter


router = APIRouter(
    prefix="/auth",
    tags=["authentication"]
)

@router.post("/signup")
async def signup():
    return {'data':{'message':'User has created'}}