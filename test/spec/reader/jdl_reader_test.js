'use strict';

const expect = require('chai').expect,
    fs = require('fs'),
    fail = expect.fail,
    parse = require('../../../lib/reader/jdl_reader').parse,
    parseFromFiles = require('../../../lib/reader/jdl_reader').parseFromFiles;

describe('::parse', function () {
  describe('when passing invalid parameters', function () {
    describe('such as nil', function () {
      it('throws an error', function () {
        try {
          parse(null);
          fail();
        } catch (error) {
          expect(error.name).to.eq('IllegalArgumentException')
        }
      });
    });
    describe('such as an empty array', function () {
      it('throws an error', function () {
        try {
          parse('');
          fail();
        } catch (error) {
          expect(error.name).to.eq('IllegalArgumentException')
        }
      });
    });
  });
  describe('when passing valid arguments', function () {
    describe('when reading JDL content', function () {
      it('reads it', function () {
        var input = fs.readFileSync('./test/test_files/valid_jdl.jdl', 'utf-8').toString();
        var content = parse(input);
        expect(content).not.to.be.null;
      });
    });
  });
});
describe('::parseFromFiles', function() {
  describe('when passing invalid parameters', function () {
    describe('such as nil', function () {
      it('throws an error', function () {
        try {
          parseFromFiles(null);
          fail();
        } catch (error) {
          expect(error.name).to.eq('IllegalArgumentException')
        }
      });
    });
    describe('such as an empty array', function () {
      it('throws an error', function () {
        try {
          parseFromFiles([]);
          fail();
        } catch (error) {
          expect(error.name).to.eq('IllegalArgumentException')
        }
      });
    });
    describe("such as files without the '.jh' or '.jdl' file extension", function () {
      it('throws an error', function () {
        try {
          parseFromFiles(['../../test_files/invalid_file.txt']);
          fail();
        } catch (error) {
          expect(error.name).to.eq('WrongFileException')
        }
      });
    });
    describe('such as files that do not exist', function () {
      it('throws an error', function () {
        try {
          parseFromFiles(['nofile.jh']);
          fail();
        } catch (error) {
          expect(error.name).to.eq('WrongFileException')
        }
      });
    });
    describe('such as folders', function () {
      it('throws an error', function () {
        try {
          parseFromFiles(['../../test_files/folder.jdl']);
          fail();
        } catch (error) {
          expect(error.name).to.eq('WrongFileException')
        }
      });
    });
  });
  describe('when passing valid arguments', function () {
    describe('when reading a single JDL file', function () {
      it('reads it', function () {
        var content = parseFromFiles(['./test/test_files/valid_jdl.jdl']);
        expect(content).not.to.be.null;
      });
    });
    describe('when reading more than one JDL file', function() {
      it('reads them', function () {
        var content = parseFromFiles(['./test/test_files/valid_jdl.jdl', './test/test_files/valid_jdl2.jdl']);
        expect(content).not.to.be.null;
      });
    });
    describe('when reading a complex JDL file', function() {
      it('reads them', function () {
        var content = parseFromFiles(['./test/test_files/complex_jdl.jdl']);
        expect(content).not.to.be.null;
      });
    });
  });
});
