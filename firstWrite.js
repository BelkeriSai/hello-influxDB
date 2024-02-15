const { InfluxDB, Point } = require('@influxdata/influxdb-client')
require('dotenv').config();

const token = process.env.INFLUXDB_TOKEN;

const url = 'http://localhost:8086'

const client = new InfluxDB({ url, token })

let org = 'Org'
let bucket = 'NOAA'

let writeClient = client.getWriteApi(org, bucket, 'ns');

const writedata = async () => {
    for (i = 0; i < 1000; i++) {
        let point1 = new Point('Weather').tag('Location', 'Kitchen').intField('temperature', getRandomInt(50 * 0.8)).intField('Humidity', getRandomInt(100))
        let point2 = new Point('Weather').tag('Location', 'Hall').intField('temperature', getRandomInt(50)).intField('Humidity', getRandomInt(60))
        
        console.log(i);

        await new Promise((resolve) => {
            void setTimeout(() => {
                console.log("writepoint");
                writeClient.writePoint(point1, point2);
                resolve();
            }, 10);
        });

        await new Promise((resolve, reject) => {
            void setTimeout(() => {
                console.log("flush");
                writeClient.flush();
                resolve();
            }, 10)
        })
    }

}

writedata();


function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}
