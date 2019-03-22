module.exports = (wrappedRoute) => async (request, response) => {
	try {
		return await wrappedRoute(request, response);
	} catch (err) {
		return response.status(400).send(err);
	}
};