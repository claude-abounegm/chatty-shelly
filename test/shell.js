// eslint-disable-next-line no-unused-vars
/* global describe it beforeEach afterEach  */

'use strict';

const _ = require('lodash');
const { expect } = require('chai');
const Shell = require('../src/Shell');
require('colors');

describe('commander-shelly', function() {
    it('test1', function() {
        const cmd = Shell.command(['bash', '-c', ['echo', 'hello world']]);

        expect(cmd.toString()).equal(`bash -c "echo 'hello world'"`);
    });

    it('test2', function() {
        const cmd = Shell.pipe([
            ['echo', 'hello world'],
            ['grep', 'world']
        ]);

        expect(cmd.toString()).equal(`echo 'hello world' | grep world`);
    });

    it('test3', function() {
        let cmd = Shell.and([
            ['echo', 'should print1'],
            Shell.or([
                'false',
                ['echo', 'should print2'],
                ['echo', 'should not print']
            ])
        ]);

        expect(cmd.toString()).equal(
            `echo 'should print1' && false || echo 'should print2' || echo 'should not print'`
        );
    });

    it('test4', function test4() {
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
                Shell.all([
                    ['export', { HOME: `/home/${user}` }],
                    externalCommand
                ])
            ],
            'bash'
        ]);

        console.log(cmd);
    });

    it('test5', function test5() {
        const cmd = Shell.command([
            'bash',
            '-c',
            ['ls', '-la', { '--dir': '/ho me/foo' }]
        ]);

        expect(cmd.toString()).equal(`bash -c "ls -la --dir='/ho me/foo'"`);
    });
});

// test4();

// let count = 0;
// async function exec(cmd) {
//     const id = ++count;

//     console.log(`cmd${id}`.green, cmd);

//     cmd = ['bash', '-c', cmd];
//     const ret = await _exec(cmd).then(({ data }) => data);
//     console.log(`cmd${id} result:`.green, `'${ret}'`);

//     return ret;
// }
