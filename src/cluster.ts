import cluster from "cluster";
import os from "os";

export const startApp = (clusterMode: boolean, startFunction: () => void) => {
  if (clusterMode && cluster.isMaster) {
    console.log(`Master ${process.pid} is running`);
    const cpuCount = os.cpus().length;

    Array.from({ length: cpuCount }).forEach((i) => cluster.fork());
  } else {
    startFunction();
  }
};
