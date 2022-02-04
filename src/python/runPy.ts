const runPy = (processName: string, pathToScript: string) => {
	return new Promise(function (success, nosuccess) {
		const { spawn } = require("child_process");
		const pyprog = spawn(processName, [pathToScript]);

		pyprog.stdout.on("data", function (data: any) {
			success(data);
		});

		pyprog.stderr.on("data", (data: any) => {
			nosuccess(data);
		});
	});
};
export default runPy;
