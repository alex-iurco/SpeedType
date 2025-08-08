# SpeedType Version Control Workflow Summary

This document provides a quick reference for the SpeedType project's version control workflow and development processes.

## 🚀 Quick Reference

### Branch Model
- **`main`** → Production-ready code (protected)
- **`feature/*`** → New features
- **`fix/*`** → Bug fixes
- **`test/*`** → Testing improvements

### Workflow Steps
1. Create feature branch from `main`
2. Develop and test changes
3. Submit Pull Request
4. Code review and approval
5. Merge to `main` (squash and merge)
6. Automatic deployment to production

## 🔄 Current Workflow Overview

### Branching Model: GitFlow-Inspired

```
main (protected)
├── feature/user-authentication
├── feature/modular-ai-providers
├── fix/multiplayer-tests
└── test/consolidation
```

**Branch Protection:**
- Require PR reviews before merging
- Dismiss stale reviews on new commits
- Require status checks to pass
- No direct pushes to `main`

### Pull Request Process

**PR Requirements:**
- ✅ Clear title and description
- ✅ All tests passing
- ✅ Code review approval
- ✅ No merge conflicts
- ✅ Up to date with `main`

**Merge Strategy:**
- **Squash and merge** for clean history
- **Delete branch** after merge
- **Automatic deployment** triggered

### Code Review Standards

**Review Criteria:**
- **Code Quality:** Follows conventions, well-commented, proper error handling
- **Functionality:** Works as described, no breaking changes, handles edge cases
- **Testing:** Includes tests, all tests pass, maintains coverage
- **Documentation:** Updated README/docs, API documentation current

**Review Process:**
1. Self-review by author
2. Peer review (at least 1 approval)
3. Manual testing verification
4. Final approval and merge

## 🏗 Continuous Integration/Deployment

### Automated Workflows

**Frontend Deployment:**
```yaml
Trigger: Push to main (frontend changes)
Build: Vite production build
Deploy: GitHub Pages → speedtype.robocat.ai
```

**Backend Deployment:**
```yaml
Trigger: Push to main (backend changes)
Build: Node.js production build
Deploy: Railway → speedtype-backend-production.up.railway.app
```

**Version Management:**
```yaml
Trigger: Significant commits to main (3+ commits)
Action: Bump version, create tag, update package.json
Manual: GitHub Actions workflow dispatch
```

### Version Numbering

**Semantic Versioning (SemVer):**
- **Major (X.0.0)**: Breaking changes
- **Minor (0.X.0)**: New features (backward compatible)
- **Patch (0.0.X)**: Bug fixes (backward compatible)

**Current Version:** v1.0.1

### Commit Convention

**Format:** `<type>[scope]: <description>`

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation
- `refactor`: Code refactoring
- `test`: Testing
- `chore`: Build/maintenance

**Examples:**
```bash
feat: add user authentication system
fix: resolve multiplayer synchronization issue
docs: update contributing guidelines
chore: bump version to 0.8.1 [skip ci]
```

## 📦 Deployment Architecture

### Production Environment

```
Frontend (GitHub Pages)
├── Domain: speedtype.robocat.ai
├── SSL: Auto-managed
├── Build: Vite production
└── CDN: GitHub Pages

Backend (Railway)
├── URL: speedtype-backend-production.up.railway.app
├── Environment: Node.js production
├── Auto-deploy: On main branch push
└── Health checks: Automated
```

### Development Environment

```bash
# Frontend (Local)
cd SpeedType/frontend
npm run dev → http://localhost:5173

# Backend (Local/Production)
cd SpeedType/backend
npm run dev → http://localhost:3001
# OR use production backend directly
```

## 🔍 Quality Assurance

### Testing Strategy

**Frontend:**
- Unit tests for components
- Integration tests for user flows
- E2E tests for critical paths

**Backend:**
- Unit tests for business logic
- Integration tests for APIs
- Load testing for multiplayer features

**Coverage Requirements:**
- Minimum 80% unit test coverage
- All API endpoints tested
- Critical user journeys covered

### Code Quality Tools

- **Linting:** ESLint for code style
- **Formatting:** Prettier for consistent formatting
- **Type Checking:** TypeScript where applicable
- **CI/CD:** Automated testing in GitHub Actions

## 🛠 Development Tools

### Required Tools

- **Node.js** v18.19.1+
- **npm** v6+
- **Git** (latest)
- **Code Editor** (VS Code recommended)

### Optional Tools

- **GitHub CLI** for PR management
- **Railway CLI** for backend deployment
- **Postman/Insomnia** for API testing

## 📞 Support and Contact

### Getting Help

- **Documentation:** [CONTRIBUTING.md](./CONTRIBUTING.md)
- **Issues:** GitHub Issues tab
- **Discussions:** GitHub Discussions
- **Maintainer:** [@alex-iurco](https://github.com/alex-iurco)

### Project Links

- **Repository:** https://github.com/alex-iurco/SpeedType
- **Live Demo:** https://speedtype.robocat.ai
- **Backend API:** https://speedtype-backend-production.up.railway.app

---

*For detailed information, see [CONTRIBUTING.md](./CONTRIBUTING.md) and project documentation in the `/docs` folder.*
