## [1.8.1](https://github.com/khaledalam/avatoon/compare/v1.8.0...v1.8.1) (2026-07-09)

### Bug Fixes

* stop and release avatar audio on unmount so switching modes doesn't overlap clips ([1488793](https://github.com/khaledalam/avatoon/commit/148879353613349aaa90dba528d0fffa9189ab72))

## [1.8.0](https://github.com/khaledalam/avatoon/compare/v1.7.0...v1.8.0) (2026-07-09)

### Features

* add Azure/Polly/Rhubarb viseme converters and fix/expand the viseme map ([3489c17](https://github.com/khaledalam/avatoon/commit/3489c17cbae19a92b1d4d17cda2a51cfe56eb36e))

## [1.7.0](https://github.com/khaledalam/avatoon/compare/v1.6.0...v1.7.0) (2026-07-09)

### Features

* add onError prop with an error boundary so a bad glbUrl won't crash the host app ([e6d3e10](https://github.com/khaledalam/avatoon/commit/e6d3e10f7d4d54dd5f69ee0973bf72af1b5116b8))

### Performance Improvements

* compress placeholder avatar asset 12.3MB to 3.6MB ([d61cf16](https://github.com/khaledalam/avatoon/commit/d61cf16a0a1a25ea1413b6f2830a74c37c0302b6))
* **example:** meshopt-compress demo avatar 12.3MB to 3.6MB (visemes preserved) ([f579b1f](https://github.com/khaledalam/avatoon/commit/f579b1fea3eb561134caa6eb92679265f11a8077))

## [1.6.0](https://github.com/khaledalam/avatoon/compare/v1.5.1...v1.6.0) (2026-07-09)

### Features

* configurable camera framing with better defaults and arms-down LipSync pose ([3727021](https://github.com/khaledalam/avatoon/commit/37270214e66cc2872d5f4c586bf96ed47d133150))

## [1.5.1](https://github.com/khaledalam/avatoon/compare/v1.5.0...v1.5.1) (2026-07-09)

### Bug Fixes

* clone GLTF scene per instance so multiple avatars on a page don't conflict ([3776751](https://github.com/khaledalam/avatoon/commit/3776751f4aa916ad4ed8413eca043694d81f4c25))

## [1.5.0](https://github.com/khaledalam/avatoon/compare/v1.4.1...v1.5.0) (2026-07-09)

### Features

* add imperative play/stop ref API, eye-blinking, and SSR-safe audio ([2704d72](https://github.com/khaledalam/avatoon/commit/2704d729b81456a3cc0240d654ea28f95cdcd43b))
* **example:** redesign demo into a polished landing page with goal switcher ([b5cd52a](https://github.com/khaledalam/avatoon/commit/b5cd52a88c6871dab43f40597583490f3235df1e))

## [1.4.1](https://github.com/khaledalam/avatoon/compare/v1.4.0...v1.4.1) (2026-07-09)

### Bug Fixes

* consume packed tarball in demo to dedupe React and pin three/TS ([11089e1](https://github.com/khaledalam/avatoon/commit/11089e1438e1f4149675ce6a34ac27de8fb71724))

## [1.4.1](https://github.com/khaledalam/avatoon/compare/v1.4.0...v1.4.1) (2026-07-09)

### Bug Fixes

* consume packed tarball in demo to dedupe React and pin three/TS ([11089e1](https://github.com/khaledalam/avatoon/commit/11089e1438e1f4149675ce6a34ac27de8fb71724))

## 1.0.0 (2026-07-08)

### Features

* add CI fix for semantic-release ([1128294](https://github.com/khaledalam/avatoon/commit/1128294f866ed9296ccd2188a1c494645c715f63))
* add demo gif. ([1a6f1a4](https://github.com/khaledalam/avatoon/commit/1a6f1a42999ed7d84f8c2524818fc04ce6ce229c))
* add demo video. ([22295f2](https://github.com/khaledalam/avatoon/commit/22295f2c6682494d08946aa9d0bc8844ee13ff25))
* add demo video. ([30f55d8](https://github.com/khaledalam/avatoon/commit/30f55d8a647d6256e2f0988739df12b82af3d741))
* Add example. ([592aa2a](https://github.com/khaledalam/avatoon/commit/592aa2aa3bdd1197b0f925132c272889bf9945b1))
* add LipSyncAvatoon component and Android reference ([5333c59](https://github.com/khaledalam/avatoon/commit/5333c596fbdb5cd6551c478d77d2f69bab28cac0))
* add rollup-plugin-visualizer. ([635d418](https://github.com/khaledalam/avatoon/commit/635d418b7bc4a178cd0731c2c81377c02e13bc35))
* codecov. ([e441c14](https://github.com/khaledalam/avatoon/commit/e441c14a78213774986f3473767b6ccefd971291))
* disable arm and hands animation while talking, fix example. ([419caff](https://github.com/khaledalam/avatoon/commit/419caff2172b6ac2ec7d8f30a7901c7bb0db9d3f))
* disable arm and hands animation while talking, fix example. ([9698c9e](https://github.com/khaledalam/avatoon/commit/9698c9eb423c34305422b19fdce797b206cd9cad))
* exclude example from jest. ([d9339a8](https://github.com/khaledalam/avatoon/commit/d9339a8694b2b76b280f87b18bfe6958cd8e3ba9))
* Finish inital avatoon version. ([a4ba902](https://github.com/khaledalam/avatoon/commit/a4ba902a4cd4c5ae87260a77c177360e326a66c2))
* git pull ([3de665b](https://github.com/khaledalam/avatoon/commit/3de665b033430f09abbc78b8e0e3292db04c41c1))
* update npm versions. ([5bcb3cf](https://github.com/khaledalam/avatoon/commit/5bcb3cf5b9d598fe986673997d1e9be9f8c070d1))

### Bug Fixes

* consume packed tarball in demo to dedupe React and pin three/TS ([11089e1](https://github.com/khaledalam/avatoon/commit/11089e1438e1f4149675ce6a34ac27de8fb71724))
* sync package-lock with package.json ([345022b](https://github.com/khaledalam/avatoon/commit/345022bbd9ac5b2727fab4286ed5979b739102d2))

## 1.0.0 (2025-05-09)

### Features

* add CI fix for semantic-release ([1128294](https://github.com/khaledalam/avatoon/commit/1128294f866ed9296ccd2188a1c494645c715f63))
* add demo gif. ([1a6f1a4](https://github.com/khaledalam/avatoon/commit/1a6f1a42999ed7d84f8c2524818fc04ce6ce229c))
* add demo video. ([22295f2](https://github.com/khaledalam/avatoon/commit/22295f2c6682494d08946aa9d0bc8844ee13ff25))
* add demo video. ([30f55d8](https://github.com/khaledalam/avatoon/commit/30f55d8a647d6256e2f0988739df12b82af3d741))
* Add example. ([592aa2a](https://github.com/khaledalam/avatoon/commit/592aa2aa3bdd1197b0f925132c272889bf9945b1))
* add rollup-plugin-visualizer. ([635d418](https://github.com/khaledalam/avatoon/commit/635d418b7bc4a178cd0731c2c81377c02e13bc35))
* codecov. ([e441c14](https://github.com/khaledalam/avatoon/commit/e441c14a78213774986f3473767b6ccefd971291))
* disable arm and hands animation while talking, fix example. ([419caff](https://github.com/khaledalam/avatoon/commit/419caff2172b6ac2ec7d8f30a7901c7bb0db9d3f))
* disable arm and hands animation while talking, fix example. ([9698c9e](https://github.com/khaledalam/avatoon/commit/9698c9eb423c34305422b19fdce797b206cd9cad))
* exclude example from jest. ([d9339a8](https://github.com/khaledalam/avatoon/commit/d9339a8694b2b76b280f87b18bfe6958cd8e3ba9))
* Finish inital avatoon version. ([a4ba902](https://github.com/khaledalam/avatoon/commit/a4ba902a4cd4c5ae87260a77c177360e326a66c2))
* git pull ([3de665b](https://github.com/khaledalam/avatoon/commit/3de665b033430f09abbc78b8e0e3292db04c41c1))
* update npm versions. ([5bcb3cf](https://github.com/khaledalam/avatoon/commit/5bcb3cf5b9d598fe986673997d1e9be9f8c070d1))

### Bug Fixes

* sync package-lock with package.json ([345022b](https://github.com/khaledalam/avatoon/commit/345022bbd9ac5b2727fab4286ed5979b739102d2))

## 1.0.0 (2025-05-08)

### Features

* add CI fix for semantic-release ([1128294](https://github.com/khaledalam/avatoon/commit/1128294f866ed9296ccd2188a1c494645c715f63))
* add demo gif. ([1a6f1a4](https://github.com/khaledalam/avatoon/commit/1a6f1a42999ed7d84f8c2524818fc04ce6ce229c))
* add demo video. ([22295f2](https://github.com/khaledalam/avatoon/commit/22295f2c6682494d08946aa9d0bc8844ee13ff25))
* add demo video. ([30f55d8](https://github.com/khaledalam/avatoon/commit/30f55d8a647d6256e2f0988739df12b82af3d741))
* Add example. ([592aa2a](https://github.com/khaledalam/avatoon/commit/592aa2aa3bdd1197b0f925132c272889bf9945b1))
* codecov. ([e441c14](https://github.com/khaledalam/avatoon/commit/e441c14a78213774986f3473767b6ccefd971291))
* disable arm and hands animation while talking, fix example. ([419caff](https://github.com/khaledalam/avatoon/commit/419caff2172b6ac2ec7d8f30a7901c7bb0db9d3f))
* disable arm and hands animation while talking, fix example. ([9698c9e](https://github.com/khaledalam/avatoon/commit/9698c9eb423c34305422b19fdce797b206cd9cad))
* exclude example from jest. ([d9339a8](https://github.com/khaledalam/avatoon/commit/d9339a8694b2b76b280f87b18bfe6958cd8e3ba9))
* Finish inital avatoon version. ([a4ba902](https://github.com/khaledalam/avatoon/commit/a4ba902a4cd4c5ae87260a77c177360e326a66c2))
* git pull ([3de665b](https://github.com/khaledalam/avatoon/commit/3de665b033430f09abbc78b8e0e3292db04c41c1))
* update npm versions. ([5bcb3cf](https://github.com/khaledalam/avatoon/commit/5bcb3cf5b9d598fe986673997d1e9be9f8c070d1))

### Bug Fixes

* sync package-lock with package.json ([345022b](https://github.com/khaledalam/avatoon/commit/345022bbd9ac5b2727fab4286ed5979b739102d2))

## 1.0.0 (2025-05-08)

### Features

* add CI fix for semantic-release ([1128294](https://github.com/khaledalam/avatoon/commit/1128294f866ed9296ccd2188a1c494645c715f63))
* add demo video. ([22295f2](https://github.com/khaledalam/avatoon/commit/22295f2c6682494d08946aa9d0bc8844ee13ff25))
* add demo video. ([30f55d8](https://github.com/khaledalam/avatoon/commit/30f55d8a647d6256e2f0988739df12b82af3d741))
* Add example. ([592aa2a](https://github.com/khaledalam/avatoon/commit/592aa2aa3bdd1197b0f925132c272889bf9945b1))
* codecov. ([e441c14](https://github.com/khaledalam/avatoon/commit/e441c14a78213774986f3473767b6ccefd971291))
* disable arm and hands animation while talking, fix example. ([419caff](https://github.com/khaledalam/avatoon/commit/419caff2172b6ac2ec7d8f30a7901c7bb0db9d3f))
* disable arm and hands animation while talking, fix example. ([9698c9e](https://github.com/khaledalam/avatoon/commit/9698c9eb423c34305422b19fdce797b206cd9cad))
* exclude example from jest. ([d9339a8](https://github.com/khaledalam/avatoon/commit/d9339a8694b2b76b280f87b18bfe6958cd8e3ba9))
* Finish inital avatoon version. ([a4ba902](https://github.com/khaledalam/avatoon/commit/a4ba902a4cd4c5ae87260a77c177360e326a66c2))
* git pull ([3de665b](https://github.com/khaledalam/avatoon/commit/3de665b033430f09abbc78b8e0e3292db04c41c1))
* update npm versions. ([5bcb3cf](https://github.com/khaledalam/avatoon/commit/5bcb3cf5b9d598fe986673997d1e9be9f8c070d1))

### Bug Fixes

* sync package-lock with package.json ([345022b](https://github.com/khaledalam/avatoon/commit/345022bbd9ac5b2727fab4286ed5979b739102d2))

## 1.0.0 (2025-05-08)

### Features

* add CI fix for semantic-release ([1128294](https://github.com/khaledalam/avatoon/commit/1128294f866ed9296ccd2188a1c494645c715f63))
* add demo video. ([22295f2](https://github.com/khaledalam/avatoon/commit/22295f2c6682494d08946aa9d0bc8844ee13ff25))
* add demo video. ([30f55d8](https://github.com/khaledalam/avatoon/commit/30f55d8a647d6256e2f0988739df12b82af3d741))
* Add example. ([592aa2a](https://github.com/khaledalam/avatoon/commit/592aa2aa3bdd1197b0f925132c272889bf9945b1))
* codecov. ([e441c14](https://github.com/khaledalam/avatoon/commit/e441c14a78213774986f3473767b6ccefd971291))
* disable arm and hands animation while talking, fix example. ([419caff](https://github.com/khaledalam/avatoon/commit/419caff2172b6ac2ec7d8f30a7901c7bb0db9d3f))
* disable arm and hands animation while talking, fix example. ([9698c9e](https://github.com/khaledalam/avatoon/commit/9698c9eb423c34305422b19fdce797b206cd9cad))
* exclude example from jest. ([d9339a8](https://github.com/khaledalam/avatoon/commit/d9339a8694b2b76b280f87b18bfe6958cd8e3ba9))
* Finish inital avatoon version. ([a4ba902](https://github.com/khaledalam/avatoon/commit/a4ba902a4cd4c5ae87260a77c177360e326a66c2))
* git pull ([3de665b](https://github.com/khaledalam/avatoon/commit/3de665b033430f09abbc78b8e0e3292db04c41c1))
* update npm versions. ([5bcb3cf](https://github.com/khaledalam/avatoon/commit/5bcb3cf5b9d598fe986673997d1e9be9f8c070d1))

### Bug Fixes

* sync package-lock with package.json ([345022b](https://github.com/khaledalam/avatoon/commit/345022bbd9ac5b2727fab4286ed5979b739102d2))

## 1.0.0 (2025-05-08)

### Features

* add CI fix for semantic-release ([1128294](https://github.com/khaledalam/avatoon/commit/1128294f866ed9296ccd2188a1c494645c715f63))
* add demo video. ([22295f2](https://github.com/khaledalam/avatoon/commit/22295f2c6682494d08946aa9d0bc8844ee13ff25))
* add demo video. ([30f55d8](https://github.com/khaledalam/avatoon/commit/30f55d8a647d6256e2f0988739df12b82af3d741))
* Add example. ([592aa2a](https://github.com/khaledalam/avatoon/commit/592aa2aa3bdd1197b0f925132c272889bf9945b1))
* codecov. ([e441c14](https://github.com/khaledalam/avatoon/commit/e441c14a78213774986f3473767b6ccefd971291))
* disable arm and hands animation while talking, fix example. ([419caff](https://github.com/khaledalam/avatoon/commit/419caff2172b6ac2ec7d8f30a7901c7bb0db9d3f))
* disable arm and hands animation while talking, fix example. ([9698c9e](https://github.com/khaledalam/avatoon/commit/9698c9eb423c34305422b19fdce797b206cd9cad))
* exclude example from jest. ([d9339a8](https://github.com/khaledalam/avatoon/commit/d9339a8694b2b76b280f87b18bfe6958cd8e3ba9))
* Finish inital avatoon version. ([a4ba902](https://github.com/khaledalam/avatoon/commit/a4ba902a4cd4c5ae87260a77c177360e326a66c2))
* git pull ([3de665b](https://github.com/khaledalam/avatoon/commit/3de665b033430f09abbc78b8e0e3292db04c41c1))
* update npm versions. ([5bcb3cf](https://github.com/khaledalam/avatoon/commit/5bcb3cf5b9d598fe986673997d1e9be9f8c070d1))

### Bug Fixes

* sync package-lock with package.json ([345022b](https://github.com/khaledalam/avatoon/commit/345022bbd9ac5b2727fab4286ed5979b739102d2))

## 1.0.0 (2025-05-08)

### Features

* add CI fix for semantic-release ([1128294](https://github.com/khaledalam/avatoon/commit/1128294f866ed9296ccd2188a1c494645c715f63))
* add demo video. ([22295f2](https://github.com/khaledalam/avatoon/commit/22295f2c6682494d08946aa9d0bc8844ee13ff25))
* add demo video. ([30f55d8](https://github.com/khaledalam/avatoon/commit/30f55d8a647d6256e2f0988739df12b82af3d741))
* Add example. ([592aa2a](https://github.com/khaledalam/avatoon/commit/592aa2aa3bdd1197b0f925132c272889bf9945b1))
* codecov. ([e441c14](https://github.com/khaledalam/avatoon/commit/e441c14a78213774986f3473767b6ccefd971291))
* disable arm and hands animation while talking, fix example. ([419caff](https://github.com/khaledalam/avatoon/commit/419caff2172b6ac2ec7d8f30a7901c7bb0db9d3f))
* disable arm and hands animation while talking, fix example. ([9698c9e](https://github.com/khaledalam/avatoon/commit/9698c9eb423c34305422b19fdce797b206cd9cad))
* exclude example from jest. ([d9339a8](https://github.com/khaledalam/avatoon/commit/d9339a8694b2b76b280f87b18bfe6958cd8e3ba9))
* Finish inital avatoon version. ([a4ba902](https://github.com/khaledalam/avatoon/commit/a4ba902a4cd4c5ae87260a77c177360e326a66c2))
* git pull ([3de665b](https://github.com/khaledalam/avatoon/commit/3de665b033430f09abbc78b8e0e3292db04c41c1))
* update npm versions. ([5bcb3cf](https://github.com/khaledalam/avatoon/commit/5bcb3cf5b9d598fe986673997d1e9be9f8c070d1))

### Bug Fixes

* sync package-lock with package.json ([345022b](https://github.com/khaledalam/avatoon/commit/345022bbd9ac5b2727fab4286ed5979b739102d2))

## [1.4.0](https://github.com/khaledalam/avatoon/compare/v1.3.0...v1.4.0) (2025-05-08)

### Features

* exclude example from jest. ([8c3971c](https://github.com/khaledalam/avatoon/commit/8c3971c500162fcac214038188ec78f59623ce59))

## [1.3.0](https://github.com/khaledalam/avatoon/compare/v1.2.0...v1.3.0) (2025-05-08)

### Features

* codecov. ([e0b2143](https://github.com/khaledalam/avatoon/commit/e0b2143772ae9f219736c65efb49b398f13e23d5))

## [1.2.0](https://github.com/khaledalam/avatoon/compare/v1.1.0...v1.2.0) (2025-05-08)

### Features

* disable arm and hands animation while talking, fix example. ([a14ec05](https://github.com/khaledalam/avatoon/commit/a14ec053c8ced6ac7f1718570fddd0e9462039ed))
* disable arm and hands animation while talking, fix example. ([1618aaf](https://github.com/khaledalam/avatoon/commit/1618aaf355a4d16012ad8c4b95ac1acdfb405fa2))

## [1.1.0](https://github.com/khaledalam/avatoon/compare/v1.0.0...v1.1.0) (2025-05-08)

### Features

* Add example. ([0429b6d](https://github.com/khaledalam/avatoon/commit/0429b6d7fbc09ca7574fa75d4ea2bc95185d76af))
* update npm versions. ([dd83ecc](https://github.com/khaledalam/avatoon/commit/dd83ecc61aa78ba1f5c303fd45d89364fbda9e70))

## 1.0.0 (2025-05-08)

### Features

* add CI fix for semantic-release ([11055d3](https://github.com/khaledalam/avatoon/commit/11055d34eaa54bba72b7b9227aa74e09bc28c339))
* Finish inital avatoon version. ([a4ba902](https://github.com/khaledalam/avatoon/commit/a4ba902a4cd4c5ae87260a77c177360e326a66c2))
* git pull ([22e8e49](https://github.com/khaledalam/avatoon/commit/22e8e495662db5e204515d930baa6b99831787b9))

### Bug Fixes

* sync package-lock with package.json ([345022b](https://github.com/khaledalam/avatoon/commit/345022bbd9ac5b2727fab4286ed5979b739102d2))
