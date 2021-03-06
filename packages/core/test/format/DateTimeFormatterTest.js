/**
 * @copyright (c) 2016, Philipp Thürwächter & Pattrick Hüper
 * @license BSD-3-Clause (see LICENSE.md in the root directory of this source tree)
 */
import { expect } from 'chai';

import '../_init';

import { DateTimeFormatter } from '../../src/format/DateTimeFormatter';
import { ResolverStyle } from '../../src/format/ResolverStyle';
import { NullPointerException } from '../../src/errors';
import { LocalDateTime } from '../../src/LocalDateTime';
import { ZoneOffset } from '../../src/ZoneOffset';
import { LocalDate } from '../../src/LocalDate';
import { LocalTime } from '../../src/LocalTime';

/* these tests are not copied from threetenbp, but js-joda tests to increase coverage */
describe('js-joda DateTimeFormatterTest', () => {
    describe('withResolverStyle', () => {
        it('should set the ResolverStyle', () => {
            let formatter = DateTimeFormatter.ofPattern('uuuu');
            expect(formatter._resolverStyle).to.eql(ResolverStyle.SMART);
            formatter = formatter.withResolverStyle(ResolverStyle.STRICT);
            expect(formatter._resolverStyle).to.eql(ResolverStyle.STRICT);
        });
        it('should return the same DateTimeFormatter it has been called with', () => {
            const formatter = DateTimeFormatter.ofPattern('uuuu');
            const newFormatter = formatter.withResolverStyle(formatter._resolverStyle);
            expect(newFormatter).to.equal(formatter);
        });
        it('should fail with NullPointerException if param is null', () => {
            expect(() => {
                const formatter = DateTimeFormatter.ofPattern('uuuu');
                formatter.withResolverStyle(null);
            }).to.throw(NullPointerException);
        });
    });

    describe('ISO formatters', () => {
        const zonedDateTime = LocalDateTime.parse('2018-04-28T12:34').atZone(ZoneOffset.ofHours(2));

        it('should properly use BASIC_ISO_DATE format', () => {
            checkFormat(DateTimeFormatter.BASIC_ISO_DATE, '20180428');
        });

        it('should properly use ISO_LOCAL_DATE format', () => {
            checkFormat(DateTimeFormatter.ISO_LOCAL_DATE, '2018-04-28');
        });

        it('should properly use ISO_OFFSET_DATE format', () => {
            checkFormat(DateTimeFormatter.ISO_OFFSET_DATE, '2018-04-28+02:00');
        });

        it('should properly use ISO_LOCAL_TIME format', () => {
            checkFormat(DateTimeFormatter.ISO_LOCAL_TIME, '12:34:00');
        });

        it('should properly use ISO_OFFSET_TIME format', () => {
            checkFormat(DateTimeFormatter.ISO_OFFSET_TIME, '12:34:00+02:00');
        });

        it('should properly use ISO_LOCAL_DATE_TIME format', () => {
            checkFormat(DateTimeFormatter.ISO_LOCAL_DATE_TIME, '2018-04-28T12:34:00');
        });

        it('should properly use ISO_OFFSET_DATE_TIME format', () => {
            checkFormat(DateTimeFormatter.ISO_OFFSET_DATE_TIME, '2018-04-28T12:34:00+02:00');
        });

        it('should properly use ISO_ZONED_DATE_TIME format', () => {
            checkFormat(DateTimeFormatter.ISO_ZONED_DATE_TIME, '2018-04-28T12:34:00+02:00[+02:00]');
        });

        it('should properly use ISO_ORDINAL_DATE format', () => {
            checkFormat(DateTimeFormatter.ISO_ORDINAL_DATE, '2018-118');
            expect(LocalDateTime.parse('2018-01-01T00:00').format(DateTimeFormatter.ISO_ORDINAL_DATE)).to.eql('2018-1');
        });

        it('should properly use ISO_WEEK_DATE format', () => {
            checkFormat(DateTimeFormatter.ISO_WEEK_DATE, '2018-W17-6');
        });

        it('should properly use ISO_INSTANT format', () => {
            checkFormat(DateTimeFormatter.ISO_INSTANT, '2018-04-28T10:34:00Z');
        });

        describe('should properly use ISO_DATE format for', () => {
            it('LocalDate', () => {
                checkFormat(DateTimeFormatter.ISO_DATE, '2018-04-28', LocalDate.of(2018, 4, 28));
            });
            it('LocalDateTime', () => {
                checkFormat(DateTimeFormatter.ISO_DATE, '2018-04-28', LocalDateTime.parse('2018-04-28T12:34'));
            });
            it('ZonedDateTime', () => {
                checkFormat(DateTimeFormatter.ISO_DATE, '2018-04-28+02:00');
            });
            it('ZonedDateTime at UTC', () => {
                checkFormat(DateTimeFormatter.ISO_DATE, '2018-04-28Z', LocalDateTime.parse('2018-04-28T12:34').atZone(ZoneOffset.UTC));
            });
        });

        describe('should properly use ISO_TIME format for', () => {
            it('LocalTime', () => {
                checkFormat(DateTimeFormatter.ISO_TIME, '12:34:56', LocalTime.of(12, 34, 56));
            });
            it('LocalDateTime', () => {
                checkFormat(DateTimeFormatter.ISO_TIME, '12:34:00', LocalDateTime.parse('2018-04-28T12:34'));
            });
            it('ZonedDateTime', () => {
                checkFormat(DateTimeFormatter.ISO_TIME, '12:34:00+02:00');
            });
            it('ZonedDateTime at UTC', () => {
                checkFormat(DateTimeFormatter.ISO_TIME, '12:34:00Z', LocalDateTime.parse('2018-04-28T12:34').atZone(ZoneOffset.UTC));
            });
        });

        describe('should properly use ISO_DATE_TIME format for', () => {
            it('LocalDateTime', () => {
                checkFormat(DateTimeFormatter.ISO_DATE_TIME, '2018-04-28T12:34:00', LocalDateTime.parse('2018-04-28T12:34'));
            });
            it('ZonedDateTime', () => {
                checkFormat(DateTimeFormatter.ISO_DATE_TIME, '2018-04-28T12:34:00+02:00');
            });
            it('ZonedDateTime at UTC', () => {
                checkFormat(DateTimeFormatter.ISO_DATE_TIME, '2018-04-28T12:34:00Z', LocalDateTime.parse('2018-04-28T12:34').atZone(ZoneOffset.UTC));
            });
        });

        // TODO: RFC_1123_DATE_TIME

        function checkFormat(formatter, expectedResult, dateTime = zonedDateTime) {
            expect(dateTime.format(formatter)).to.eql(expectedResult);
        }
    });
});
