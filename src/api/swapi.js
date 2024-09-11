const BASE_URL = "https://swapi.dev/api/";

export async function searchTypeByName(type, name, page=1){
  try {
    const apiResponse = await fetch(`${BASE_URL}${type}?search=${name}&page=${page}`);
    const response = await apiResponse.json();
    return {
      success: true,
      data: response,
      error: null
    };
  } catch (err) {
    return {
      success: false,
      error: "Something went wrong"
    };
  }
}