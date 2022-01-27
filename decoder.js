// Decode decodes an array of bytes into an object.
//  - fPort contains the LoRaWAN fPort number
//  - bytes is an array of bytes, e.g. [225, 230, 255, 0]
// The function must return an object, e.g. {"temperature": 22.5}
const rawData = { bytes: "CjA2YGAAgbMAEA==", fPort: 1 };

function Decode(fPort, bytes) {
	const buf6 = Buffer.from(bytes, "base64");
	console.log(buf6);
	let decoded = {};

	for (let index = 0; index < buf6.length; index++) {
		console.log(buf6[index]);
		switch (index) {
			case 0:
				decoded.CVP = buf6[index];
				break;
			case 1:
				decoded.FSRV = buf6[index] / 2;
				break;
			case 2:
				decoded.FTMP = buf6[index] / 2;
				break;
			case 3:
				decoded.ASRV = buf6[index] / 4;
				break;
			case 4:
				decoded.ATMP = buf6[index] / 4;
				break;
			case 5:
				let bits = hexToBinaryArray(buf6[index]);
				console.log(bits);
				decoded.RES = bits[0];
				decoded.ES = bits[0];
				decoded.HA = bits[0];
				decoded.ASF = bits[0];
				decoded.FSF = bits[0];
				decoded.RES = bits[0];
				decoded.RES = bits[0];
				break;

			default:
				break;
		}
	}
	console.log(decoded);
	// decoded.obj = LoRaObject;
	return decoded;
}
Decode(rawData.fPort, rawData.bytes);

function hexToBinaryArray(hex) {
	return hex.toString(2).padStart(8, "0").split("");
}
