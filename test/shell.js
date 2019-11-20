// eslint-disable-next-line no-unused-vars
/* global describe it beforeEach afterEach  */

'use strict';

const _ = require('lodash');
// const { expect } = require('chai');
const Shell = require('../src/Shell');
require('colors');

async function test1() {
    let cmd = Shell.and([
        ['echo', 'should print1'],
        Shell.or([
            'false',
            ['echo', 'should print2'],
            ['echo', 'should not print']
        ])
    ]);

    console.log(cmd);
}

function test2() {
    const cmd = Shell.pipe([
        ['echo', 'hello world'],
        ['grep', 'world']
    ]);

    console.log(cmd);
}

async function test3() {
    const externalCommand = [
        'bash',
        '-c',
        [
            'echo',
            '--username=hello world',
            { '--pass': "hell'o1 ${HOME}" },
            'hello world'
        ]
    ];

    const user = 'foo 22';
    const cmd = Shell.pipe([
        [
            'echo',
            Shell.all([['export', { HOME: `/home/${user}` }], externalCommand])
        ],
        ['bash']
    ]);

    console.log(cmd);
}

test3();

// let count = 0;
// async function exec(cmd) {
//     const id = ++count;

//     console.log(`cmd${id}`.green, cmd);

//     cmd = ['bash', '-c', cmd];
//     const ret = await _exec(cmd).then(({ data }) => data);
//     console.log(`cmd${id} result:`.green, `'${ret}'`);

//     return ret;
// }
