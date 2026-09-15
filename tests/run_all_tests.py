import unittest
import sys
import os

# Ensure backend root is on path
backend_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
sys.path.insert(0, backend_dir)

def run_all_tests():
    print("=" * 70)
    print("     AegisMind OS - Master Quality Assurance Test Suite")
    print("=" * 70)

    loader = unittest.TestLoader()
    suite = loader.discover(os.path.dirname(__file__), pattern="test_*.py")

    runner = unittest.TextTestRunner(verbosity=2)
    result = runner.run(suite)

    print("=" * 70)
    if result.wasSuccessful():
        print(f"ALL TESTS PASSED: {result.testsRun}/{result.testsRun} (100% PASS)")
        sys.exit(0)
    else:
        print(f"TEST FAILURES: {len(result.failures)} | ERRORS: {len(result.errors)}")
        sys.exit(1)

if __name__ == "__main__":
    run_all_tests()
