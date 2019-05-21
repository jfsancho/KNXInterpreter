/*

curl http://localhost:3000

curl -X POST http://localhost:3000

curl -X PUT http://localhost:3000

curl -X DELETE http://localhost:3000

curl http://localhost:3000/devices/

//GET dev
curl -H 'Content-Type: application/json' -H "Accept: application/json" -X GET -d '{"devId":"0/0/1"}' http://localhost:3000/devices/dev/

curl -X POST http://localhost:3000/devices/dev

//PUT device
curl -H 'Content-Type: application/json' -H 'Accept: application/json' -X PUT -d '{"devId":"0/0/1"}' http://localhost:3000/devices/dev

//DELETE device
curl -H 'Content-Type: application/json' -H "Accept: application/json" -X DELETE -d '{"devId":"0/0/1"}' http://localhost:3000/devices/dev/

//GET /dev/read
curl -H 'Content-Type: application/json' -H "Accept: application/json" -X GET -d '{"devId":"0/0/1"}' http://localhost:3000/devices/dev/read

//POST /dev/write
curl -H 'Content-Type: application/json' -H "Accept: application/json" -d '{"devId":"0/0/1","value":"false"}' http://localhost:3000/devices/dev/write


curl http://localhost:3000/processes/

//GET proc
curl -H 'Content-Type: application/json' -H "Accept: application/json" -X GET -d '{"procId":1}' http://localhost:3000/processes/proc/

//POST proc
curl -H 'Content-Type: application/json' -H "Accept: application/json" -d '{"readType":"onchange", "cycleTime":0,"device":"0/0/3"}' http://localhost:3000/processes/proc/

//PUT proc
curl -H 'Content-Type: application/json' -H "Accept: application/json" -X PUT -d '{"procId":3, "readType":"cycleRead", "cycleTime":10,"device":"0/0/3"}' http://localhost:3000/processes/proc/

//DELETE proc
curl -H 'Content-Type: application/json' -H "Accept: application/json" -X DELETE -d '{"procId":3}' http://localhost:3000/processes/proc/


*/