const fs = require("fs");
const archiver = require("archiver");
const path = require("path");

const output = fs.createWriteStream(__dirname + "/dist/ps_cod_fee.ocmod.zip");

const archive = archiver("zip", {
  zlib: { level: 4 },
});

output.on("close", function () {
  console.log(archive.pointer() + " total bytes");
  console.log("ps_cod_fee.ocmod.zip has been created");
});

archive.on("warning", function (err) {
  if (err.code === "ENOENT") {
    console.warn("Warning:", err);
  } else {
    throw err;
  }
});

archive.on("error", function (err) {
  throw err;
});

archive.pipe(output);

archive.directory("src/upload/", "upload");
archive.file("src/install.xml", { name: "install.xml" });
archive.file("src/installation.txt", { name: "installation.txt" });

archive.finalize();
